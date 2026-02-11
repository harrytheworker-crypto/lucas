import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  activities: defineTable({
    type: v.string(), // 'task_completed', 'file_created', 'message_sent', 'cron_executed', 'research_done', etc.
    title: v.string(),
    description: v.optional(v.string()),
    category: v.string(), // 'coding', 'research', 'communication', 'system', 'analysis'
    status: v.string(), // 'pending', 'in_progress', 'completed', 'failed'
    metadata: v.optional(v.object({
      filePath: v.optional(v.string()),
      toolUsed: v.optional(v.string()),
      duration: v.optional(v.number()), // in seconds
      tokensUsed: v.optional(v.number()),
      cost: v.optional(v.number()),
    })),
    tags: v.optional(v.array(v.string())),
    createdAt: v.number(), // timestamp
    completedAt: v.optional(v.number()),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_type", ["type"])
    .index("by_category", ["category"])
    .index("by_status", ["status"]),

  scheduledTasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    scheduledFor: v.number(), // timestamp
    recurrence: v.optional(v.string()), // 'daily', 'weekly', 'hourly', 'once'
    category: v.string(),
    status: v.string(), // 'scheduled', 'completed', 'skipped', 'failed'
    completedAt: v.optional(v.number()),
    result: v.optional(v.string()),
  })
    .index("by_scheduledFor", ["scheduledFor"])
    .index("by_status", ["status"]),

  documents: defineTable({
    title: v.string(),
    content: v.optional(v.string()),
    filePath: v.string(),
    fileType: v.string(), // 'markdown', 'json', 'code', 'config'
    lastModified: v.number(),
    tags: v.optional(v.array(v.string())),
  })
    .index("by_filePath", ["filePath"])
    .index("by_lastModified", ["lastModified"]),

  searchIndex: defineTable({
    documentId: v.id("documents"),
    words: v.array(v.string()),
    updatedAt: v.number(),
  }).index("by_words", ["words"]),
});
