# GuroPrep server helper

One small service (`guroprep-ai`) that does three things:

1. **AI drafts** of the *L — Learning experience* steps in Classroom tools ("✨ Write with AI").
2. **Usage statistics** without cookies (`track.js` on each page → `/api/stats/event`). Visitors are counted with a hash that changes every week; raw IPs are not stored.
3. **Move Up Academy teacher applications** from `careers.html` → `/api/apply`.

See everything at **https://guroprep.com/admin.html** (needs `ADMIN_KEY`). Data files: `/var/lib/guroprep/stats.json` and `/var/lib/guroprep/applications.jsonl`.

- `ai-server.js` — small Node.js service (no packages needed). Listens on `127.0.0.1:3001`; Nginx forwards `/api/` to it.
- `setup-ai.sh` — one-time setup on the server (installs Node.js, creates the `guroprep-ai` service, connects Nginx).

## Settings (`/etc/guroprep/ai.env`, never in GitHub)

| Setting | Default | Meaning |
|---|---|---|
| `OPENAI_API_KEY` | (empty) | OpenAI key for GuroPrep |
| `OPENAI_MODEL` | `gpt-4.1-mini` | Model used for drafts |
| `DAILY_LIMIT_PER_IP` | `15` | Drafts per visitor per day (Philippine time) |
| `DAILY_LIMIT_TOTAL` | `500` | Drafts for the whole site per day |
| `ADMIN_KEY` | (random, made by setup) | Password for admin.html |

After changing settings: `sudo systemctl restart guroprep-ai`

## Useful commands

- Status: `curl -s http://127.0.0.1:3001/api/ai/status`
- Logs: `sudo journalctl -u guroprep-ai -n 50`
- After `git pull`: `sudo systemctl restart guroprep-ai`
- Show admin key: `sudo grep ADMIN_KEY /etc/guroprep/ai.env`
- Back up applications: `sudo cp /var/lib/private/guroprep/applications.jsonl ~/`

Teachers' text is sent to OpenAI to make the draft; the server does not store it (logs keep only grade, subject and a counter).
