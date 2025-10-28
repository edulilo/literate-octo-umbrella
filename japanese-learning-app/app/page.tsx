import Link from 'next/link';
import { UserButton } from '@stackframe/stack';
import { stackServerApp } from '@/stack/server';

export default async function Home() {
  const user = await stackServerApp.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50">
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Learn Japanese with Confidence
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Master vocabulary, kanji, and grammar through structured lessons and spaced repetition
          </p>
          {!user && (
            <Link
              href="/handler/sign-up"
              className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold"
            >
              Get Started Free
            </Link>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Lessons Card */}
          <Link href="/lessons" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Structured Lessons
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Follow a carefully designed curriculum from beginner to advanced levels
              </p>
            </div>
          </Link>

          {/* Vocabulary Card */}
          <Link href="/vocabulary" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Vocabulary Practice
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learn essential words and phrases with example sentences and audio
              </p>
            </div>
          </Link>

          {/* Kanji Card */}
          <Link href="/kanji" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">漢</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Kanji Mastery
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Master Japanese characters with mnemonics and writing practice
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Study System Section */}
      {user && (
        <section className="container mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">Ready to Study?</h2>
              <p className="text-lg mb-6 text-indigo-100">
                Continue your learning journey with spaced repetition flashcards
              </p>
              <Link
                href="/study"
                className="inline-block px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-semibold"
              >
                Start Studying
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features List */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Why Choose Our App?
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex gap-4">
            <div className="text-2xl">🎯</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Spaced Repetition
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Review items at optimal intervals for maximum retention
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">📈</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Track Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor your learning with detailed statistics and insights
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">🔄</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Adaptive Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Focus on what you need to learn most with intelligent algorithms
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">💡</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Mnemonics
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Remember kanji easily with memorable stories and visual aids
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 dark:bg-gray-900 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
          <p>Japanese Learning App - Start your journey today</p>
        </div>
      </footer>
    </div>
  );
}
