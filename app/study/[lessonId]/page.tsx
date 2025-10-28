import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { vocabulary } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import StudyClient from "./StudyClient";

export default async function StudyPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const session = await auth();
  const { lessonId } = await params;

  if (!session?.user) {
    redirect("/auth/signin");
  }

  // Get vocabulary for this lesson
  const vocabList = await db
    .select()
    .from(vocabulary)
    .where(eq(vocabulary.lessonId, lessonId));

  if (vocabList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            No vocabulary available for this lesson
          </h1>
          <a
            href="/dashboard"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return <StudyClient vocabulary={vocabList} lessonId={lessonId} />;
}
