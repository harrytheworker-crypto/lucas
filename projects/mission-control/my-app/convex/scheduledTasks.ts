import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get scheduled tasks for a date range (for calendar view)
export const getScheduledTasks = query({
  args: {
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("scheduledTasks")
      .withIndex("by_scheduledFor")
      .filter((q) => q.gte("scheduledFor", args.startDate).and(q.lte("scheduledFor", args.endDate)))
      .collect();
    return tasks;
  },
});

// Schedule a new task
export const scheduleTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    scheduledFor: v.number(),
    recurrence: v.optional(v.string()),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("scheduledTasks", {
      ...args,
      status: "scheduled",
    });
    return taskId;
  },
});

// Mark task as completed
export const completeTask = mutation({
  args: {
    id: v.id("scheduledTasks"),
    result: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "completed",
      completedAt: Date.now(),
      result: args.result,
    });
  },
});

// Get upcoming tasks
export const getUpcomingTasks = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const tasks = await ctx.db
      .query("scheduledTasks")
      .withIndex("by_scheduledFor")
      .filter((q) => q.gte("scheduledFor", now).and(q.eq("status", "scheduled")))
      .take(args.limit ?? 20);
    return tasks;
  },
});
