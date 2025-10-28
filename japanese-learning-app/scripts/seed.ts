import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as schema from '../lib/db/schema';

dotenv.config({ path: '.env.local' });

const seedData = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  console.log('🌱 Seeding database...');

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });

  // Seed vocabulary
  const vocabularyData = [
    {
      word: 'こんにちは',
      hiragana: 'こんにちは',
      romaji: 'konnichiwa',
      meaning: 'Hello, Good afternoon',
      type: 'phrase' as const,
      difficulty: 'beginner' as const,
      exampleSentence: 'こんにちは、元気ですか？',
      exampleTranslation: 'Hello, how are you?',
    },
    {
      word: 'ありがとう',
      hiragana: 'ありがとう',
      romaji: 'arigatou',
      meaning: 'Thank you',
      type: 'phrase' as const,
      difficulty: 'beginner' as const,
      exampleSentence: 'ありがとうございます。',
      exampleTranslation: 'Thank you very much.',
    },
    {
      word: '水',
      hiragana: 'みず',
      romaji: 'mizu',
      meaning: 'Water',
      type: 'noun' as const,
      difficulty: 'beginner' as const,
      exampleSentence: '水を飲みます。',
      exampleTranslation: 'I drink water.',
    },
    {
      word: '本',
      hiragana: 'ほん',
      romaji: 'hon',
      meaning: 'Book',
      type: 'noun' as const,
      difficulty: 'beginner' as const,
      exampleSentence: '本を読みます。',
      exampleTranslation: 'I read a book.',
    },
    {
      word: '食べる',
      hiragana: 'たべる',
      romaji: 'taberu',
      meaning: 'To eat',
      type: 'verb' as const,
      difficulty: 'beginner' as const,
      exampleSentence: 'ご飯を食べます。',
      exampleTranslation: 'I eat rice.',
    },
    {
      word: '行く',
      hiragana: 'いく',
      romaji: 'iku',
      meaning: 'To go',
      type: 'verb' as const,
      difficulty: 'beginner' as const,
      exampleSentence: '学校に行きます。',
      exampleTranslation: 'I go to school.',
    },
    {
      word: '美しい',
      hiragana: 'うつくしい',
      romaji: 'utsukushii',
      meaning: 'Beautiful',
      type: 'adjective' as const,
      difficulty: 'intermediate' as const,
      exampleSentence: '花が美しいです。',
      exampleTranslation: 'The flowers are beautiful.',
    },
    {
      word: '速い',
      hiragana: 'はやい',
      romaji: 'hayai',
      meaning: 'Fast, Quick',
      type: 'adjective' as const,
      difficulty: 'beginner' as const,
      exampleSentence: '車が速いです。',
      exampleTranslation: 'The car is fast.',
    },
  ];

  await db.insert(schema.vocabulary).values(vocabularyData);
  console.log('✅ Seeded vocabulary');

  // Seed kanji
  const kanjiData = [
    {
      character: '日',
      meaning: 'Sun, Day',
      onyomi: 'ニチ、ジツ',
      kunyomi: 'ひ、か',
      strokeCount: 4,
      jlptLevel: 5,
      frequency: 1,
      radical: '日',
      examples: JSON.stringify(['日本 (にほん) - Japan', '今日 (きょう) - Today', '毎日 (まいにち) - Every day']),
      mnemonic: 'Picture of the sun with a sunspot in the middle',
    },
    {
      character: '本',
      meaning: 'Book, Origin',
      onyomi: 'ホン',
      kunyomi: 'もと',
      strokeCount: 5,
      jlptLevel: 5,
      frequency: 10,
      radical: '木',
      examples: JSON.stringify(['本 (ほん) - Book', '日本 (にほん) - Japan', '本当 (ほんとう) - Really']),
      mnemonic: 'A tree (木) with a horizontal line at the root, showing the origin',
    },
    {
      character: '人',
      meaning: 'Person, Human',
      onyomi: 'ジン、ニン',
      kunyomi: 'ひと',
      strokeCount: 2,
      jlptLevel: 5,
      frequency: 5,
      radical: '人',
      examples: JSON.stringify(['人 (ひと) - Person', '日本人 (にほんじん) - Japanese person', '一人 (ひとり) - One person']),
      mnemonic: 'Picture of a person walking with two legs',
    },
    {
      character: '水',
      meaning: 'Water',
      onyomi: 'スイ',
      kunyomi: 'みず',
      strokeCount: 4,
      jlptLevel: 5,
      frequency: 30,
      radical: '水',
      examples: JSON.stringify(['水 (みず) - Water', '水曜日 (すいようび) - Wednesday', '水泳 (すいえい) - Swimming']),
      mnemonic: 'A river flowing from the center with tributaries',
    },
    {
      character: '学',
      meaning: 'Study, Learning',
      onyomi: 'ガク',
      kunyomi: 'まな(ぶ)',
      strokeCount: 8,
      jlptLevel: 5,
      frequency: 50,
      radical: '子',
      examples: JSON.stringify(['学校 (がっこう) - School', '大学 (だいがく) - University', '学生 (がくせい) - Student']),
      mnemonic: 'A child under a roof learning',
    },
  ];

  await db.insert(schema.kanji).values(kanjiData);
  console.log('✅ Seeded kanji');

  // Seed lessons
  const lessonsData = [
    {
      title: 'Introduction to Japanese Greetings',
      description: 'Learn basic Japanese greetings and how to introduce yourself',
      difficulty: 'beginner' as const,
      order: 1,
      content: '# Introduction to Japanese Greetings\n\nIn this lesson, you will learn:\n- Basic greetings\n- How to say thank you\n- Simple responses\n\n## Common Greetings\n\n- こんにちは (konnichiwa) - Hello\n- ありがとう (arigatou) - Thank you\n- おはよう (ohayou) - Good morning',
      objectives: JSON.stringify(['Greet people in Japanese', 'Say thank you', 'Understand basic responses']),
      estimatedMinutes: 15,
      published: true,
    },
    {
      title: 'Basic Vocabulary: Everyday Items',
      description: 'Learn vocabulary for common everyday items',
      difficulty: 'beginner' as const,
      order: 2,
      content: '# Basic Vocabulary: Everyday Items\n\nLearn words for common items you encounter daily:\n- 本 (hon) - Book\n- 水 (mizu) - Water\n- 車 (kuruma) - Car',
      objectives: JSON.stringify(['Identify common objects in Japanese', 'Use nouns in simple sentences']),
      estimatedMinutes: 20,
      published: true,
    },
    {
      title: 'Basic Verbs',
      description: 'Introduction to common Japanese verbs',
      difficulty: 'beginner' as const,
      order: 3,
      content: '# Basic Verbs\n\nLearn essential action verbs:\n- 食べる (taberu) - To eat\n- 行く (iku) - To go\n- 見る (miru) - To see',
      objectives: JSON.stringify(['Understand verb forms', 'Use verbs in basic sentences']),
      estimatedMinutes: 25,
      published: true,
    },
  ];

  const lessons = await db.insert(schema.lessons).values(lessonsData).returning();
  console.log('✅ Seeded lessons');

  // Link vocabulary to lessons
  await db.insert(schema.lessonVocabulary).values([
    { lessonId: lessons[0].id, vocabularyId: 1, order: 1 },
    { lessonId: lessons[0].id, vocabularyId: 2, order: 2 },
    { lessonId: lessons[1].id, vocabularyId: 3, order: 1 },
    { lessonId: lessons[1].id, vocabularyId: 4, order: 2 },
    { lessonId: lessons[2].id, vocabularyId: 5, order: 1 },
    { lessonId: lessons[2].id, vocabularyId: 6, order: 2 },
  ]);
  console.log('✅ Linked vocabulary to lessons');

  // Link kanji to lessons
  await db.insert(schema.lessonKanji).values([
    { lessonId: lessons[0].id, kanjiId: 1, order: 1 },
    { lessonId: lessons[1].id, kanjiId: 2, order: 1 },
    { lessonId: lessons[1].id, kanjiId: 4, order: 2 },
    { lessonId: lessons[2].id, kanjiId: 5, order: 1 },
  ]);
  console.log('✅ Linked kanji to lessons');

  await pool.end();

  console.log('🎉 Seeding completed');
};

seedData()
  .catch((err) => {
    console.error('❌ Seeding failed');
    console.error(err);
    process.exit(1);
  });
