import { auth } from "@/lib/auth";
import { db, studySessions } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { lessonId, duration, itemsStudied, itemsCorrect } = body;

    await db.insert(studySessions).values({
      userId: session.user.id,
      lessonId: lessonId || null,
      duration,
      itemsStudied,
      itemsCorrect,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving study session:", error);
    return NextResponse.json(
      { error: "Failed to save study session" },
      { status: 500 }
    );
  }
}
