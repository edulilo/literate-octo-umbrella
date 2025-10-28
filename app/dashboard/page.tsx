import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { lessons, userProgress, studySessions } from "@/lib/db/schema";
import { eq, desc, count, sql } from "drizzle-orm";
import Link from "next/link";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // Get all lessons
  const allLessons = await db.select().from(lessons).orderBy(lessons.order);

  // Get user's progress count
  const progressCount = await db
    .select({ count: count() })
    .from(userProgress)
    .where(eq(userProgress.userId, session.user.id));

  // Get mastered count
  const masteredCount = await db
    .select({ count: count() })
    .from(userProgress)
    .where(
      sql`${userProgress.userId} = ${session.user.id} AND ${userProgress.mastered} = true`
    );

  // Get recent study sessions
  const recentSessions = await db
    .select()
    .from(studySessions)
    .where(eq(studySessions.userId, session.user.id))
    .orderBy(desc(studySessions.completedAt))
    .limit(5);

  const totalProgress = progressCount[0]?.count || 0;
  const totalMastered = masteredCount[0]?.count || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/dashboard" className="text-2xl font-bold text-indigo-600">
              日本語 Learning
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">
                {session.user.name || session.user.email}
              </span>
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Welcome back!</h1>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-sm text-gray-600 mb-1">Words Studied</div>
            <div className="text-3xl font-bold text-indigo-600">
              {totalProgress}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-sm text-gray-600 mb-1">Words Mastered</div>
            <div className="text-3xl font-bold text-green-600">
              {totalMastered}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-sm text-gray-600 mb-1">Study Sessions</div>
            <div className="text-3xl font-bold text-blue-600">
              {recentSessions.length}
            </div>
          </div>
        </div>

        {/* Lessons */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Lessons</h2>
          {allLessons.length === 0 ? (
            <p className="text-gray-600">
              No lessons available yet. Check back soon!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {allLessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.id}`}
                  className="border border-gray-200 rounded-lg p-4 hover:border-indigo-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold">{lesson.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        lesson.difficulty === "beginner"
                          ? "bg-green-100 text-green-800"
                          : lesson.difficulty === "intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {lesson.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{lesson.description}</p>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {recentSessions.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-3">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex justify-between items-center border-b border-gray-100 pb-3"
                >
                  <div>
                    <div className="font-medium">Study Session</div>
                    <div className="text-sm text-gray-600">
                      {session.itemsStudied} items studied •{" "}
                      {Math.round(
                        (session.itemsCorrect / session.itemsStudied) * 100
                      )}
                      % accuracy
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(session.completedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
