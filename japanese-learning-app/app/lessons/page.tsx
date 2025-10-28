import Link from 'next/link';
import { db, lessons } from '@/lib/db';
import { stackServerApp } from '@/stack/server';
import { UserButton } from '@stackframe/stack';

export default async function LessonsPage() {
  const user = await stackServerApp.getUser();
  const allLessons = await db.select().from(lessons).where(lessons.published).orderBy(lessons.order);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            日本語アプリ
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/lessons" className="text-indigo-600 dark:text-indigo-400 font-semibold">
              Lessons
            </Link>
            <Link href="/vocabulary" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              Vocabulary
            </Link>
            <Link href="/kanji" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              Kanji
            </Link>
            {user ? (
              <>
                <Link href="/study" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
                  Study
                </Link>
                <UserButton />
              </>
            ) : (
              <Link
                href="/handler/sign-in"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Japanese Lessons
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            Follow our structured curriculum to master Japanese step by step
          </p>

          <div className="space-y-4">
            {allLessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="block bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {lesson.title}
                      </h2>
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                        {lesson.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {lesson.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                      {lesson.estimatedMinutes && (
                        <span className="flex items-center gap-1">
                          <span>⏱️</span>
                          {lesson.estimatedMinutes} min
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <span>📚</span>
                        Lesson {lesson.order}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="text-indigo-600 dark:text-indigo-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {allLessons.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No lessons available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
