import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    description: v.string(),
    status: v.string(), // 'in_progress', 'completed', 'pending', 'blocked'
    progress: v.number(),
    tasks: v.array(v.object({
      id: v.string(),
      title: v.string(),
      status: v.string(), // 'todo', 'in_progress', 'done'
      priority: v.string(),
    })),
    lastUpdated: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_lastUpdated", ["lastUpdated"]),

  activities: defineTable({
    type: v.string(),
    title: v.string(),
    description: v.string(),
    category: v.string(),
    timestamp: v.number(),
  })
    .index("by_timestamp", ["timestamp"])
    .index("by_category", ["category"]),

  scheduledTasks: defineTable({
    title: v.string(),
    scheduledFor: v.number(),
    recurrence: v.optional(v.string()),
    status: v.string(),
  })
    .index("by_scheduledFor", ["scheduledFor"]),
});
