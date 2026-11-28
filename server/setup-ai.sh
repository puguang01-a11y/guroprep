#!/usr/bin/env bash
# GuroPrep helper (AI drafts, usage statistics, teacher applications) — server setup (run with: sudo bash /var/www/guroprep/server/setup-ai.sh)
# Installs Node.js, creates the guroprep-ai service and connects it to Nginx at /api/.
# The OpenAI key itself is saved separately in /etc/guroprep/ai.env (see README in this folder).
set -euo pipefail
APP=/var/www/guroprep

if ! command -v node >/dev/null 2>&1; then
  apt-get update -y && apt-get install -y nodejs
fi
echo "Node: $(node --version)"

mkdir -p /etc/guroprep
if [ ! -f /etc/guroprep/ai.env ]; then
  printf 'OPENAI_API_KEY=\nOPENAI_MODEL=gpt-4.1-mini\nDAILY_LIMIT_PER_IP=15\nDAILY_LIMIT_TOTAL=500\n' > /etc/guroprep/ai.env
fi
if ! grep -q '^ADMIN_KEY=' /etc/guroprep/ai.env; then
  echo "ADMIN_KEY=$(openssl rand -hex 16)" >> /etc/guroprep/ai.env
fi
chmod 600 /etc/guroprep/ai.env

cat > /etc/systemd/system/guroprep-ai.service <<EOF
[Unit]
Description=GuroPrep helper (AI drafts, statistics, applications)
After=network-online.target

[Service]
EnvironmentFile=/etc/guroprep/ai.env
ExecStart=/usr/bin/node $APP/server/ai-server.js
Restart=always
RestartSec=3
DynamicUser=yes
StateDirectory=guroprep
NoNewPrivileges=yes
ProtectSystem=strict
ProtectHome=yes
PrivateTmp=yes

[Install]
WantedBy=multi-user.target
EOF

cat > /etc/nginx/snippets/guroprep-api.conf <<'EOF'
location /api/ {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
    proxy_read_timeout 75s;
    client_max_body_size 32k;
}
EOF

SITE=/etc/nginx/sites-available/guroprep
if ! grep -q 'guroprep-api.conf' "$SITE"; then
  cp "$SITE" "$SITE.bak.$(date +%s)"
  sed -i 's#^\(\s*\)root /var/www/guroprep/dist;#\1root /var/www/guroprep/dist;\n\1include snippets/guroprep-api.conf;#' "$SITE"
fi

systemctl daemon-reload
systemctl enable --now guroprep-ai
systemctl restart guroprep-ai
nginx -t && systemctl reload nginx
sleep 1
echo "--- status ---"
curl -s http://127.0.0.1:3001/api/ai/status; echo
echo
echo "Admin page: https://guroprep.com/admin.html"
echo "Your admin key (keep it private): $(grep '^ADMIN_KEY=' /etc/guroprep/ai.env | cut -d= -f2)"
echo "Done. If the status says \"enabled\":false, save your OpenAI key next."
