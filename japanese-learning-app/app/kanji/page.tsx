import Link from 'next/link';
import { db, kanji } from '@/lib/db';
import { stackServerApp } from '@/stack/server';
import { UserButton } from '@stackframe/stack';

export default async function KanjiPage() {
  const user = await stackServerApp.getUser();
  const allKanji = await db.select().from(kanji).orderBy(kanji.jlptLevel, kanji.frequency).limit(50);

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
            <Link href="/vocabulary" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              Vocabulary
            </Link>
            <Link href="/kanji" className="text-indigo-600 dark:text-indigo-400 font-semibold">
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
            Kanji
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            Master Japanese characters one by one
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allKanji.map((k) => {
              let examples = [];
              try {
                examples = JSON.parse(k.examples || '[]');
              } catch (e) {
                // ignore parsing errors
              }

              return (
                <div
                  key={k.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-center mb-4">
                    <div className="text-6xl font-bold text-gray-900 dark:text-white mb-3">
                      {k.character}
                    </div>
                    <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
                      {k.meaning}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Onyomi:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{k.onyomi || '-'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Kunyomi:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{k.kunyomi || '-'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Strokes:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{k.strokeCount}</span>
                    </div>
                    {k.jlptLevel && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">JLPT:</span>
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                          N{k.jlptLevel}
                        </span>
                      </div>
                    )}
                  </div>

                  {k.mnemonic && (
                    <div className="mt-4 pt-4 border-t dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                        💡 {k.mnemonic}
                      </p>
                    </div>
                  )}

                  {examples.length > 0 && (
                    <div className="mt-4 pt-4 border-t dark:border-gray-700">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                        Examples:
                      </p>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {examples.slice(0, 3).map((example: string, idx: number) => (
                          <li key={idx}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {allKanji.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No kanji available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
