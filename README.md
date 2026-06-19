# Login + Animals demo (Flask + Supabase)

Quick demo showing a login page that redirects to an animals/endangered-species page.

Setup

1. Copy `.env.example` to `.env` and fill `SUPABASE_URL` and `SUPABASE_KEY`.
2. (Optional) create a `users` table in Supabase with columns: `id`, `email`, `password`.
3. (Optional) create an `animals` table with columns: `id`, `name`, `species`, `status`, `description`.
4. Install dependencies and run (Node + Vite):

```powershell
# install dependencies
npm install

# start dev server
npm run dev
```

Notes

- This demo uses a simple plaintext password check against a `users` table for brevity. For production use Supabase Auth and hashed passwords.
- Populate the `animals` table via the Supabase dashboard.
