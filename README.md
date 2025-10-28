# Japanese Learning App

A modern Japanese learning application built with Next.js, Neon Auth (Stack Auth), and Neon PostgreSQL database.

## Features

- User authentication with Neon Auth (Stack Auth)
- Japanese vocabulary learning
- Hiragana and Katakana lessons
- Progress tracking
- Streak monitoring
- Interactive learning interface

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Authentication**: Stack Auth (Neon Auth)
- **Database**: Neon PostgreSQL
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Neon account with Auth enabled
- Vercel account (for deployment)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Neon Database
DATABASE_URL=your_neon_database_url_here

# Stack Auth (Neon Auth)
NEXT_PUBLIC_STACK_PROJECT_ID=your_stack_project_id_here
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_stack_publishable_key_here
STACK_SECRET_SERVER_KEY=your_stack_secret_key_here
```

You can find these values in your Neon project's Auth configuration page.

### Installation

```bash
# Install dependencies
npm install

# Run database migrations (optional)
# You can run the schema.sql file against your Neon database
# psql $DATABASE_URL < db/schema.sql

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Schema

The app uses three main tables:

- `user_progress`: Tracks lesson completion and scores
- `vocabulary_progress`: Tracks vocabulary learning progress
- `user_stats`: Stores user statistics like streaks and total words learned

Run the SQL schema file in `db/schema.sql` to set up these tables in your Neon database.

## Deployment

This app is configured for Vercel deployment:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add the environment variables in Vercel's project settings
4. Deploy!

Vercel will automatically detect this as a Next.js project and configure the build settings.

## Project Structure

```
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── dashboard/    # Dashboard page
│   │   ├── lessons/      # Lesson pages
│   │   ├── vocabulary/   # Vocabulary page
│   │   └── handler/      # Stack Auth handler
│   ├── components/       # React components
│   └── lib/             # Utility functions and configurations
│       ├── stack.ts     # Stack Auth server configuration
│       ├── stack-client.ts # Stack Auth client provider
│       └── db.ts        # Neon database connection
├── db/
│   └── schema.sql       # Database schema
└── public/              # Static assets
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Neon Auth Documentation](https://neon.com/docs/neon-auth/overview)
- [Stack Auth Documentation](https://docs.stack-auth.com)
- [Neon Database Documentation](https://neon.com/docs)

## License

MIT