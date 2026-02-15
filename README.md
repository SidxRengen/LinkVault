## 🚧 Challenges Faced & How I Solved Them

### 1️⃣ Realtime Updates Not Working (Supabase Realtime)

**Problem:**
Bookmarks were not updating in real-time across tabs. The WebSocket connection kept showing `CLOSED` or `TIMED_OUT`.

**Root Cause:**
- React Strict Mode in development was causing double mounting of `useEffect`, which created and removed Supabase channels repeatedly.
- The WebSocket connection was being cleaned up before fully establishing.
- In some cases, environment variables were misconfigured, causing connection issues.

**Solution:**
- Disabled `reactStrictMode` during debugging to verify the issue.
- Ensured the realtime channel was created only when `user.id` exists.
- Properly cleaned up the channel using `supabase.removeChannel(channel)`.
- Verified Supabase Realtime was enabled and the table was added to the `supabase_realtime` publication.
- Confirmed correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` were set in Vercel.

Result: Realtime updates now work correctly across multiple tabs without refreshing.

---

### 2️⃣ Google OAuth Redirect Issue on Vercel

**Problem:**
After logging in with Google in production, users were being redirected to `http://localhost:3000` instead of the deployed Vercel URL.

**Root Cause:**
- Supabase Site URL was still set to `http://localhost:3000`.
- OAuth fallback redirect uses the configured Site URL when the provided redirect URL doesn’t match exactly.
- Environment variables in Vercel were not properly configured at first.

**Solution:**
- Updated Supabase → Authentication → URL Configuration:
  - Set **Site URL** to the production Vercel domain.
  - Added the production `/dashboard` route under Redirect URLs.
- Ensured environment variables were properly configured in Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Redeployed the application after updating environment variables.

Result: Google login now redirects correctly in both local and production environments.

---


### 3️⃣ User Data Privacy Issue (Seeing Other Users’ Bookmarks)

**Problem:**
Initially, bookmarks from other users were visible when fetching data from the database.

**Root Cause:**
- The query was using `.select("*")` without filtering by `user_id`.
- Row Level Security (RLS) was not properly configured, allowing unrestricted reads.

**Solution:**
- Updated the fetch query to include:
  ```ts
  .eq("user_id", user?.id)
  ```
- Enabled Row Level Security (RLS) on the `bookmarks` table.
- Added policies for:
  - SELECT (view own bookmarks)
  - INSERT (add own bookmarks)
  - UPDATE (edit own bookmarks)
  - DELETE (delete own bookmarks)

Result: Each user can now only access their own bookmarks, ensuring proper data isolation and security.

---

### 4️⃣ Vercel Deployment Build Failure (Environment Variables Missing)

**Problem:**
During deployment, the build failed with the error:
`Error: supabaseUrl is required.`

**Root Cause:**
- Environment variables defined in `.env.local` are not automatically available in Vercel.
- Supabase client initialization was running during server-side prerendering, but environment variables were undefined in production.

**Solution:**
- Added the following environment variables in Vercel → Project Settings → Environment Variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Redeployed the application after setting environment variables.

Result: The application builds successfully in production and connects correctly to Supabase.

---

These challenges helped improve my understanding of:
- Supabase Realtime architecture
- OAuth redirect flows
- Environment variable handling in Next.js
- Differences between local development and production deployment