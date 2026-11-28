# GuroPrep AI helper

Drafts the **L — Learning experience** steps of a lesson plan in Classroom tools ("✨ Write with AI").

- `ai-server.js` — small Node.js service (no packages needed). Listens on `127.0.0.1:3001`; Nginx forwards `/api/` to it.
- `setup-ai.sh` — one-time setup on the server (installs Node.js, creates the `guroprep-ai` service, connects Nginx).

## Settings (`/etc/guroprep/ai.env`, never in GitHub)

| Setting | Default | Meaning |
|---|---|---|
| `OPENAI_API_KEY` | (empty) | OpenAI key for GuroPrep |
| `OPENAI_MODEL` | `gpt-4.1-mini` | Model used for drafts |
| `DAILY_LIMIT_PER_IP` | `15` | Drafts per visitor per day (Philippine time) |
| `DAILY_LIMIT_TOTAL` | `500` | Drafts for the whole site per day |

After changing settings: `sudo systemctl restart guroprep-ai`

## Useful commands

- Status: `curl -s http://127.0.0.1:3001/api/ai/status`
- Logs: `sudo journalctl -u guroprep-ai -n 50`
- After `git pull`: `sudo systemctl restart guroprep-ai`

Teachers' text is sent to OpenAI to make the draft; the server does not store it (logs keep only grade, subject and a counter).
