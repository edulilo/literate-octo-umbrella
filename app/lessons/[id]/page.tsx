import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { lessons, vocabulary } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;

  if (!session?.user) {
    redirect("/auth/signin");
  }

  // Get lesson details
  const lesson = await db
    .select()
    .from(lessons)
    .where(eq(lessons.id, id))
    .limit(1);

  if (!lesson || lesson.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
          <Link
            href="/dashboard"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Get vocabulary for this lesson
  const vocabList = await db
    .select()
    .from(vocabulary)
    .where(eq(vocabulary.lessonId, id));

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/dashboard"
            className="text-indigo-600 hover:text-indigo-800"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{lesson[0].title}</h1>
              <p className="text-gray-600">{lesson[0].description}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                lesson[0].difficulty === "beginner"
                  ? "bg-green-100 text-green-800"
                  : lesson[0].difficulty === "intermediate"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {lesson[0].difficulty}
            </span>
          </div>

          {vocabList.length > 0 && (
            <Link
              href={`/study/${id}`}
              className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors mt-4"
            >
              Start Studying ({vocabList.length} words)
            </Link>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Vocabulary</h2>
          {vocabList.length === 0 ? (
            <p className="text-gray-600">
              No vocabulary available for this lesson yet.
            </p>
          ) : (
            <div className="space-y-4">
              {vocabList.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-indigo-400 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-2xl font-bold mb-1">
                        {item.japanese}
                      </div>
                      {item.hiragana && (
                        <div className="text-lg text-gray-600 mb-1">
                          {item.hiragana}
                        </div>
                      )}
                      <div className="text-sm text-gray-500">
                        {item.romaji}
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        item.type === "word"
                          ? "bg-blue-100 text-blue-800"
                          : item.type === "phrase"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>
                  <div className="text-lg mb-2">{item.english}</div>
                  {item.exampleSentence && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="text-sm text-gray-700 mb-1">
                        {item.exampleSentence}
                      </div>
                      {item.exampleTranslation && (
                        <div className="text-sm text-gray-500">
                          {item.exampleTranslation}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
