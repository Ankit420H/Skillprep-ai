import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('MockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition', { length: 255 }).notNull(),
    jobDesc: text('jobDesc').notNull(),
    jobExperience: varchar('jobExperience', { length: 255 }).notNull(),
    createdBy: varchar('createdBy', { length: 255 }).notNull(),
    createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
    mockId: varchar('mockId', { length: 255 }).notNull().unique(),
});

export const UserAnswer = pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockIdRef', { length: 255 }).notNull(),
    question: text('question').notNull(),
    correctAns: text('correctAns'),
    userAns: text('userAns'),
    feedback: text('feedback'),
    rating: varchar('rating', { length: 10 }),
    userEmail: varchar('userEmail', { length: 255 }),
    createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
});
