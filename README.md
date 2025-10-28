# 日本語 Learning App

A modern Japanese learning application built with Next.js, featuring vocabulary lessons, flashcard-based study sessions, and progress tracking.

## Features

- 🔐 **Authentication** - Secure login with Google and GitHub via NextAuth
- 📚 **Structured Lessons** - Learn Japanese through organized lessons by difficulty
- ✍️ **Flashcard Study** - Interactive flashcard system for vocabulary practice
- 📊 **Progress Tracking** - Track your learning progress and study sessions
- 🗄️ **Database** - PostgreSQL with Neon for data persistence
- 🚀 **Auto-Migrations** - Database migrations run automatically on deployment

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth v5
- **Database**: Neon (PostgreSQL)
- **ORM**: Drizzle ORM
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Vercel account
- A Neon database (can be created through Vercel Storage)

### Environment Variables

You need to set up the following environment variables. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then fill in the values:

#### Required Variables

1. **DATABASE_URL** - Get from Vercel Dashboard:
   - Go to your project > Storage > Neon Database
   - Copy the connection string
   - Format: `postgresql://user:password@host/database`

2. **AUTH_SECRET** - Generate a random secret:
   ```bash
   openssl rand -base64 32
   ```

   **IMPORTANT**: In your Vercel dashboard, you mentioned having `NEXTAUTH_TOKEN`. This should be renamed to `AUTH_SECRET` for NextAuth v5.

#### OAuth Providers (Choose at least one)

**Google OAuth:**
- Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- Create a new OAuth 2.0 Client ID
- Add authorized redirect URI: `https://your-domain.vercel.app/api/auth/callback/google`
- Copy Client ID to `AUTH_GOOGLE_ID`
- Copy Client Secret to `AUTH_GOOGLE_SECRET`

**GitHub OAuth:**
- Go to [GitHub Developer Settings](https://github.com/settings/developers)
- Create a new OAuth App
- Set callback URL: `https://your-domain.vercel.app/api/auth/callback/github`
- Copy Client ID to `AUTH_GITHUB_ID`
- Copy Client Secret to `AUTH_GITHUB_SECRET`

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate database migrations:**
   ```bash
   npm run db:generate
   ```

3. **Run migrations:**
   ```bash
   npm run db:migrate
   ```

4. **Seed the database with initial data:**
   ```bash
   npm run db:seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## Deployment to Vercel

### Initial Setup

1. **Push your code to GitHub**

2. **Import to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Storage:**
   - In Vercel project > Storage tab
   - Create a Neon Database (if not already done)
   - Vercel will automatically add `DATABASE_URL` environment variable

4. **Add Environment Variables:**
   Go to Settings > Environment Variables and add:

   ```
   AUTH_SECRET=<your-generated-secret>
   AUTH_GOOGLE_ID=<your-google-client-id>
   AUTH_GOOGLE_SECRET=<your-google-client-secret>
   AUTH_GITHUB_ID=<your-github-client-id>
   AUTH_GITHUB_SECRET=<your-github-client-secret>
   ```

   **Note**: If you have `NEXTAUTH_TOKEN` in Vercel, delete it and use `AUTH_SECRET` instead.

5. **Deploy:**
   - Click "Deploy"
   - Migrations will run automatically during build
   - Your app will be live!

### Post-Deployment

After your first deployment:

1. **Seed the database:**
   You can run the seed script locally pointing to production:
   ```bash
   DATABASE_URL="your-production-db-url" npm run db:seed
   ```

   Or create a one-time Vercel function to seed data.

2. **Update OAuth Redirect URLs:**
   Update your OAuth app settings with your production URL:
   - Google: `https://your-app.vercel.app/api/auth/callback/google`
   - GitHub: `https://your-app.vercel.app/api/auth/callback/github`

### Automatic Migrations

Migrations run automatically on every deployment because the build script includes:
```json
"build": "npm run db:migrate && next build"
```

This ensures your database schema is always up-to-date with your code.

## Database Management

### Generate New Migration

After changing the schema in `lib/db/schema.ts`:

```bash
npm run db:generate
```

This creates a new migration file in the `drizzle` folder.

### View Database

Use Drizzle Studio to view and edit your database:

```bash
npm run db:studio
```

Opens at [https://local.drizzle.studio](https://local.drizzle.studio)

### Database Schema

The app includes these tables:
- `users` - User accounts
- `accounts` - OAuth provider accounts
- `sessions` - User sessions
- `verificationTokens` - Email verification tokens
- `lessons` - Japanese lessons
- `vocabulary` - Japanese vocabulary items
- `userProgress` - User learning progress
- `studySessions` - Study session history

## Project Structure

```
app/
├── api/
│   ├── auth/[...nextauth]/  # NextAuth API routes
│   └── study-sessions/      # Study session API
├── auth/
│   └── signin/              # Sign-in page
├── dashboard/               # Main dashboard
├── lessons/[id]/            # Lesson detail pages
└── study/[lessonId]/        # Study/flashcard interface

lib/
├── db/
│   ├── schema.ts            # Database schema
│   ├── index.ts             # Database connection
│   ├── migrate.ts           # Migration runner
│   └── seed.ts              # Seed data script
└── auth.ts                  # NextAuth configuration
```

## Adding New Lessons

You can add lessons programmatically or through Drizzle Studio:

```typescript
await db.insert(lessons).values({
  title: "Your Lesson Title",
  description: "Lesson description",
  difficulty: "beginner", // or "intermediate", "advanced"
  order: 4,
});
```

Then add vocabulary items linked to the lesson.

## Troubleshooting

### Migrations failing on Vercel
- Check that `DATABASE_URL` is set in Vercel environment variables
- Ensure the database is accessible from Vercel

### OAuth not working
- Verify redirect URLs match exactly (http vs https, trailing slashes)
- Check that OAuth credentials are correct
- Ensure `AUTH_SECRET` is set (not `NEXTAUTH_TOKEN`)

### Database connection errors
- Verify `DATABASE_URL` format is correct
- Check Neon database is active and not paused
- Ensure IP restrictions allow Vercel connections

## Contributing

Feel free to submit issues and pull requests!

## License

MIT
