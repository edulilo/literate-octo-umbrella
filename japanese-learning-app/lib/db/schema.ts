import { pgTable, text, integer, timestamp, boolean, pgEnum, serial, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const difficultyLevel = pgEnum('difficulty_level', ['beginner', 'intermediate', 'advanced']);
export const wordType = pgEnum('word_type', ['noun', 'verb', 'adjective', 'adverb', 'particle', 'phrase']);
export const reviewQuality = pgEnum('review_quality', ['again', 'hard', 'good', 'easy']);

// Vocabulary table - Japanese words and phrases
export const vocabulary = pgTable('vocabulary', {
  id: serial('id').primaryKey(),
  word: text('word').notNull(), // The word in kanji/kana
  hiragana: text('hiragana').notNull(), // Hiragana reading
  romaji: text('romaji').notNull(), // Romanized reading
  meaning: text('meaning').notNull(), // English meaning
  type: wordType('type').notNull(),
  difficulty: difficultyLevel('difficulty').notNull().default('beginner'),
  exampleSentence: text('example_sentence'),
  exampleTranslation: text('example_translation'),
  audioUrl: text('audio_url'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Kanji table - Individual kanji characters
export const kanji = pgTable('kanji', {
  id: serial('id').primaryKey(),
  character: text('character').notNull().unique(), // The kanji character
  meaning: text('meaning').notNull(), // English meaning
  onyomi: text('onyomi'), // Chinese reading
  kunyomi: text('kunyomi'), // Japanese reading
  strokeCount: integer('stroke_count').notNull(),
  jlptLevel: integer('jlpt_level'), // 5 (easiest) to 1 (hardest)
  frequency: integer('frequency'), // How common it is
  radical: text('radical'),
  examples: text('examples'), // JSON array of example words
  mnemonic: text('mnemonic'), // Memory aid
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Lessons table - Structured learning content
export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  difficulty: difficultyLevel('difficulty').notNull().default('beginner'),
  order: integer('order').notNull(), // Lesson sequence
  content: text('content'), // Rich text content (markdown/HTML)
  objectives: text('objectives'), // JSON array of learning objectives
  estimatedMinutes: integer('estimated_minutes'),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Lesson vocabulary relationship (many-to-many)
export const lessonVocabulary = pgTable('lesson_vocabulary', {
  lessonId: integer('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  vocabularyId: integer('vocabulary_id').notNull().references(() => vocabulary.id, { onDelete: 'cascade' }),
  order: integer('order').notNull(), // Order within the lesson
}, (table) => ({
  pk: primaryKey({ columns: [table.lessonId, table.vocabularyId] }),
}));

// Lesson kanji relationship (many-to-many)
export const lessonKanji = pgTable('lesson_kanji', {
  lessonId: integer('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  kanjiId: integer('kanji_id').notNull().references(() => kanji.id, { onDelete: 'cascade' }),
  order: integer('order').notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.lessonId, table.kanjiId] }),
}));

// User progress for lessons
// Note: user_id references neon_auth.users_sync(id) but we don't add foreign key constraint
// to avoid issues with cross-schema references. Referential integrity is maintained at app level.
export const userLessonProgress = pgTable('user_lesson_progress', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // References neon_auth.users_sync(id)
  lessonId: integer('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  completed: boolean('completed').default(false).notNull(),
  completedAt: timestamp('completed_at'),
  score: integer('score'), // Quiz score if applicable
  timeSpentMinutes: integer('time_spent_minutes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Flashcard reviews for vocabulary (SRS - Spaced Repetition System)
export const vocabularyReviews = pgTable('vocabulary_reviews', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // References neon_auth.users_sync(id)
  vocabularyId: integer('vocabulary_id').notNull().references(() => vocabulary.id, { onDelete: 'cascade' }),
  easeFactor: integer('ease_factor').default(2500).notNull(), // Stored as integer (2.5 = 2500)
  interval: integer('interval').default(0).notNull(), // Days until next review
  repetitions: integer('repetitions').default(0).notNull(),
  nextReview: timestamp('next_review').defaultNow().notNull(),
  lastReviewed: timestamp('last_reviewed').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Flashcard reviews for kanji (SRS)
export const kanjiReviews = pgTable('kanji_reviews', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // References neon_auth.users_sync(id)
  kanjiId: integer('kanji_id').notNull().references(() => kanji.id, { onDelete: 'cascade' }),
  easeFactor: integer('ease_factor').default(2500).notNull(),
  interval: integer('interval').default(0).notNull(),
  repetitions: integer('repetitions').default(0).notNull(),
  nextReview: timestamp('next_review').defaultNow().notNull(),
  lastReviewed: timestamp('last_reviewed').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Study sessions - Track individual study sessions
export const studySessions = pgTable('study_sessions', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // References neon_auth.users_sync(id)
  startTime: timestamp('start_time').defaultNow().notNull(),
  endTime: timestamp('end_time'),
  itemsReviewed: integer('items_reviewed').default(0).notNull(),
  itemsCorrect: integer('items_correct').default(0).notNull(),
  studyType: text('study_type').notNull(), // 'vocabulary', 'kanji', 'lesson'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const vocabularyRelations = relations(vocabulary, ({ many }) => ({
  lessonVocabulary: many(lessonVocabulary),
  reviews: many(vocabularyReviews),
}));

export const kanjiRelations = relations(kanji, ({ many }) => ({
  lessonKanji: many(lessonKanji),
  reviews: many(kanjiReviews),
}));

export const lessonsRelations = relations(lessons, ({ many }) => ({
  lessonVocabulary: many(lessonVocabulary),
  lessonKanji: many(lessonKanji),
  userProgress: many(userLessonProgress),
}));

export const userLessonProgressRelations = relations(userLessonProgress, ({ one }) => ({
  lesson: one(lessons, {
    fields: [userLessonProgress.lessonId],
    references: [lessons.id],
  }),
}));

export const vocabularyReviewsRelations = relations(vocabularyReviews, ({ one }) => ({
  vocabulary: one(vocabulary, {
    fields: [vocabularyReviews.vocabularyId],
    references: [vocabulary.id],
  }),
}));

export const kanjiReviewsRelations = relations(kanjiReviews, ({ one }) => ({
  kanji: one(kanji, {
    fields: [kanjiReviews.kanjiId],
    references: [kanji.id],
  }),
}));
