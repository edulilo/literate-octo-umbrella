# Japanese Learning App

A comprehensive Japanese learning application built with Next.js, featuring structured lessons, vocabulary practice, kanji study, and spaced repetition system (SRS).

## Features

- **Structured Lessons**: Follow a carefully designed curriculum from beginner to advanced
- **Vocabulary Practice**: Learn essential Japanese words with example sentences
- **Kanji Mastery**: Study Japanese characters with mnemonics and readings
- **Spaced Repetition**: Review items at optimal intervals for maximum retention
- **User Authentication**: Secure authentication powered by Neon Auth and Stack Auth
- **Progress Tracking**: Monitor your learning journey with detailed statistics

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Neon Postgres (serverless)
- **ORM**: Drizzle ORM
- **Authentication**: Neon Auth + Stack Auth
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- A Neon database account
- Vercel account (for deployment)

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Stack Auth keys (from Neon Console > Auth > Configuration)
NEXT_PUBLIC_STACK_PROJECT_ID=""
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=""
STACK_SECRET_SERVER_KEY=""

# Database URL (automatically set by Vercel when deployed)
DATABASE_URL=""
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Generate database migrations:
```bash
npm run db:generate
```

3. Run migrations (requires DATABASE_URL to be set):
```bash
npm run db:migrate
```

4. (Optional) Seed the database with initial data:
```bash
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## Database Schema

The app uses the following main tables:

- **vocabulary**: Japanese words and phrases with readings and meanings
- **kanji**: Individual kanji characters with readings and mnemonics
- **lessons**: Structured learning content
- **user_lesson_progress**: Tracks user progress through lessons
- **vocabulary_reviews**: SRS data for vocabulary flashcards
- **kanji_reviews**: SRS data for kanji flashcards
- **study_sessions**: Records of study sessions

User data is automatically synced from Neon Auth to the `neon_auth.users_sync` table.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes migration)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes directly (dev only)
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:seed` - Seed database with initial content

## Deployment to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Connect your Neon database (Vercel will automatically set DATABASE_URL)
4. Add Stack Auth environment variables in Vercel dashboard
5. Deploy!

The migrations will run automatically during the build process.

## Project Structure

```
japanese-learning-app/
├── app/                    # Next.js app directory
│   ├── handler/           # Stack Auth pages
│   ├── lessons/           # Lessons page
│   ├── vocabulary/        # Vocabulary page
│   ├── kanji/            # Kanji page
│   └── page.tsx          # Homepage
├── lib/
│   └── db/               # Database schema and config
│       ├── schema.ts     # Drizzle schema definitions
│       └── index.ts      # Database connection
├── scripts/
│   ├── migrate.ts        # Migration runner
│   └── seed.ts           # Database seeding
├── stack/                # Stack Auth configuration
│   ├── client.tsx
│   └── server.tsx
└── drizzle.config.ts     # Drizzle configuration
```

## License

MIT
