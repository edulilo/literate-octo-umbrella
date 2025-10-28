import { pgTable, text, timestamp, integer, boolean, primaryKey, uuid, pgEnum } from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

// NextAuth tables
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationTokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

// Japanese Learning App tables
export const difficultyEnum = pgEnum("difficulty", ["beginner", "intermediate", "advanced"]);
export const vocabularyTypeEnum = pgEnum("vocabulary_type", ["word", "phrase", "kanji"]);

export const lessons = pgTable("lessons", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  difficulty: difficultyEnum("difficulty").notNull().default("beginner"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

export const vocabulary = pgTable("vocabulary", {
  id: uuid("id").defaultRandom().primaryKey(),
  lessonId: uuid("lessonId").references(() => lessons.id, { onDelete: "cascade" }),
  type: vocabularyTypeEnum("type").notNull().default("word"),
  japanese: text("japanese").notNull(),
  hiragana: text("hiragana"),
  romaji: text("romaji").notNull(),
  english: text("english").notNull(),
  exampleSentence: text("exampleSentence"),
  exampleTranslation: text("exampleTranslation"),
  difficulty: difficultyEnum("difficulty").notNull().default("beginner"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export const userProgress = pgTable("userProgress", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  vocabularyId: uuid("vocabularyId")
    .notNull()
    .references(() => vocabulary.id, { onDelete: "cascade" }),
  lessonId: uuid("lessonId").references(() => lessons.id, { onDelete: "cascade" }),
  mastered: boolean("mastered").notNull().default(false),
  correctCount: integer("correctCount").notNull().default(0),
  incorrectCount: integer("incorrectCount").notNull().default(0),
  lastReviewed: timestamp("lastReviewed", { mode: "date" }),
  nextReview: timestamp("nextReview", { mode: "date" }),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

export const studySessions = pgTable("studySessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  lessonId: uuid("lessonId").references(() => lessons.id, { onDelete: "cascade" }),
  duration: integer("duration").notNull(), // in seconds
  itemsStudied: integer("itemsStudied").notNull(),
  itemsCorrect: integer("itemsCorrect").notNull(),
  completedAt: timestamp("completedAt", { mode: "date" }).defaultNow().notNull(),
});

// Types for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Lesson = typeof lessons.$inferSelect;
export type NewLesson = typeof lessons.$inferInsert;
export type Vocabulary = typeof vocabulary.$inferSelect;
export type NewVocabulary = typeof vocabulary.$inferInsert;
export type UserProgress = typeof userProgress.$inferSelect;
export type NewUserProgress = typeof userProgress.$inferInsert;
export type StudySession = typeof studySessions.$inferSelect;
export type NewStudySession = typeof studySessions.$inferInsert;
