import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { lessons, vocabulary } from "./schema";
import ws from "ws";

// Configure Neon to use WebSocket in Node.js environments
neonConfig.webSocketConstructor = ws;

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  console.log("Seeding database...");

  const pool = new Pool({ connectionString: databaseUrl });
  const db = drizzle(pool);

  try {
    // Create beginner lesson
    const [beginnerLesson] = await db
      .insert(lessons)
      .values({
        title: "Greetings and Basic Phrases",
        description:
          "Learn essential Japanese greetings and common everyday phrases",
        difficulty: "beginner",
        order: 1,
      })
      .returning();

    console.log("Created beginner lesson:", beginnerLesson.title);

    // Add vocabulary for beginner lesson
    await db.insert(vocabulary).values([
      {
        lessonId: beginnerLesson.id,
        type: "phrase",
        japanese: "こんにちは",
        hiragana: "こんにちは",
        romaji: "konnichiwa",
        english: "Hello / Good afternoon",
        exampleSentence: "こんにちは、元気ですか？",
        exampleTranslation: "Hello, how are you?",
        difficulty: "beginner",
      },
      {
        lessonId: beginnerLesson.id,
        type: "phrase",
        japanese: "おはよう",
        hiragana: "おはよう",
        romaji: "ohayou",
        english: "Good morning",
        exampleSentence: "おはよう、お母さん。",
        exampleTranslation: "Good morning, mom.",
        difficulty: "beginner",
      },
      {
        lessonId: beginnerLesson.id,
        type: "phrase",
        japanese: "ありがとう",
        hiragana: "ありがとう",
        romaji: "arigatou",
        english: "Thank you",
        exampleSentence: "ありがとうございます。",
        exampleTranslation: "Thank you very much.",
        difficulty: "beginner",
      },
      {
        lessonId: beginnerLesson.id,
        type: "phrase",
        japanese: "さようなら",
        hiragana: "さようなら",
        romaji: "sayounara",
        english: "Goodbye",
        exampleSentence: "さようなら、また明日。",
        exampleTranslation: "Goodbye, see you tomorrow.",
        difficulty: "beginner",
      },
      {
        lessonId: beginnerLesson.id,
        type: "phrase",
        japanese: "すみません",
        hiragana: "すみません",
        romaji: "sumimasen",
        english: "Excuse me / Sorry",
        exampleSentence: "すみません、駅はどこですか？",
        exampleTranslation: "Excuse me, where is the station?",
        difficulty: "beginner",
      },
      {
        lessonId: beginnerLesson.id,
        type: "word",
        japanese: "はい",
        hiragana: "はい",
        romaji: "hai",
        english: "Yes",
        exampleSentence: "はい、分かりました。",
        exampleTranslation: "Yes, I understand.",
        difficulty: "beginner",
      },
      {
        lessonId: beginnerLesson.id,
        type: "word",
        japanese: "いいえ",
        hiragana: "いいえ",
        romaji: "iie",
        english: "No",
        exampleSentence: "いいえ、違います。",
        exampleTranslation: "No, that's wrong.",
        difficulty: "beginner",
      },
    ]);

    console.log("Added vocabulary for beginner lesson");

    // Create intermediate lesson
    const [intermediateLesson] = await db
      .insert(lessons)
      .values({
        title: "Numbers and Counting",
        description: "Learn how to count and use numbers in Japanese",
        difficulty: "beginner",
        order: 2,
      })
      .returning();

    console.log("Created intermediate lesson:", intermediateLesson.title);

    // Add vocabulary for numbers lesson
    await db.insert(vocabulary).values([
      {
        lessonId: intermediateLesson.id,
        type: "word",
        japanese: "一",
        hiragana: "いち",
        romaji: "ichi",
        english: "One (1)",
        exampleSentence: "一つください。",
        exampleTranslation: "Please give me one.",
        difficulty: "beginner",
      },
      {
        lessonId: intermediateLesson.id,
        type: "word",
        japanese: "二",
        hiragana: "に",
        romaji: "ni",
        english: "Two (2)",
        exampleSentence: "二人です。",
        exampleTranslation: "There are two people.",
        difficulty: "beginner",
      },
      {
        lessonId: intermediateLesson.id,
        type: "word",
        japanese: "三",
        hiragana: "さん",
        romaji: "san",
        english: "Three (3)",
        exampleSentence: "三時に会いましょう。",
        exampleTranslation: "Let's meet at 3 o'clock.",
        difficulty: "beginner",
      },
      {
        lessonId: intermediateLesson.id,
        type: "word",
        japanese: "四",
        hiragana: "よん/し",
        romaji: "yon/shi",
        english: "Four (4)",
        exampleSentence: "四人家族です。",
        exampleTranslation: "It's a family of four.",
        difficulty: "beginner",
      },
      {
        lessonId: intermediateLesson.id,
        type: "word",
        japanese: "五",
        hiragana: "ご",
        romaji: "go",
        english: "Five (5)",
        exampleSentence: "五分待ってください。",
        exampleTranslation: "Please wait five minutes.",
        difficulty: "beginner",
      },
    ]);

    console.log("Added vocabulary for numbers lesson");

    // Create food and dining lesson
    const [foodLesson] = await db
      .insert(lessons)
      .values({
        title: "Food and Dining",
        description: "Common words and phrases for food and dining",
        difficulty: "intermediate",
        order: 3,
      })
      .returning();

    console.log("Created food lesson:", foodLesson.title);

    // Add vocabulary for food lesson
    await db.insert(vocabulary).values([
      {
        lessonId: foodLesson.id,
        type: "word",
        japanese: "水",
        hiragana: "みず",
        romaji: "mizu",
        english: "Water",
        exampleSentence: "水をください。",
        exampleTranslation: "Please give me water.",
        difficulty: "beginner",
      },
      {
        lessonId: foodLesson.id,
        type: "word",
        japanese: "ご飯",
        hiragana: "ごはん",
        romaji: "gohan",
        english: "Rice / Meal",
        exampleSentence: "ご飯を食べます。",
        exampleTranslation: "I eat rice / I have a meal.",
        difficulty: "beginner",
      },
      {
        lessonId: foodLesson.id,
        type: "word",
        japanese: "寿司",
        hiragana: "すし",
        romaji: "sushi",
        english: "Sushi",
        exampleSentence: "寿司が好きです。",
        exampleTranslation: "I like sushi.",
        difficulty: "beginner",
      },
      {
        lessonId: foodLesson.id,
        type: "phrase",
        japanese: "いただきます",
        hiragana: "いただきます",
        romaji: "itadakimasu",
        english: "Let's eat (said before meals)",
        exampleSentence: "いただきます！",
        exampleTranslation: "Let's eat!",
        difficulty: "beginner",
      },
      {
        lessonId: foodLesson.id,
        type: "phrase",
        japanese: "ごちそうさま",
        hiragana: "ごちそうさま",
        romaji: "gochisousama",
        english: "Thank you for the meal (said after eating)",
        exampleSentence: "ごちそうさまでした。",
        exampleTranslation: "Thank you for the meal.",
        difficulty: "beginner",
      },
    ]);

    console.log("Added vocabulary for food lesson");

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

seed();
