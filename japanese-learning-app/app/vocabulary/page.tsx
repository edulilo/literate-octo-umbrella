import Link from 'next/link';
import { db, vocabulary } from '@/lib/db';
import { stackServerApp } from '@/stack/server';
import { UserButton } from '@stackframe/stack';

export default async function VocabularyPage() {
  const user = await stackServerApp.getUser();
  const allVocabulary = await db.select().from(vocabulary).orderBy(vocabulary.difficulty, vocabulary.id).limit(50);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            日本語アプリ
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/lessons" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              Lessons
            </Link>
            <Link href="/vocabulary" className="text-indigo-600 dark:text-indigo-400 font-semibold">
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Vocabulary
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            Expand your Japanese vocabulary with essential words and phrases
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allVocabulary.map((vocab) => (
              <div
                key={vocab.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
              >
                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {vocab.word}
                  </div>
                  <div className="text-lg text-gray-600 dark:text-gray-400 mb-1">
                    {vocab.hiragana}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">
                    {vocab.romaji}
                  </div>
                </div>
                <div className="border-t dark:border-gray-700 pt-4">
                  <p className="text-gray-900 dark:text-white font-medium mb-2">
                    {vocab.meaning}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs font-medium rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                      {vocab.difficulty}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {vocab.type}
                    </span>
                  </div>
                </div>
                {vocab.exampleSentence && (
                  <div className="mt-4 pt-4 border-t dark:border-gray-700 text-sm">
                    <p className="text-gray-700 dark:text-gray-300 mb-1">
                      {vocab.exampleSentence}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500">
                      {vocab.exampleTranslation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {allVocabulary.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No vocabulary available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
