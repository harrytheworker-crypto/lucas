import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get recent activities with pagination
export const getActivities = query({
  args: {
    limit: v.optional(v.number()),
    cursor: v.optional(v.number()),
    category: v.optional(v.string()),
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    let query = ctx.db.query("activities").order("desc");
    
    if (args.category) {
      query = query.withIndex("by_category", (q) => q.eq("category", args.category));
    }
    
    if (args.type) {
      query = query.withIndex("by_type", (q) => q.eq("type", args.type));
    }
    
    if (args.cursor) {
      query = query.filter((q) => q.lt("createdAt", args.cursor));
    }
    
    const activities = await query.take(limit);
    return activities;
  },
});

// Log a new activity
export const logActivity = mutation({
  args: {
    type: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    category: v.string(),
    status: v.string(),
    metadata: v.optional(v.object({
      filePath: v.optional(v.string()),
      toolUsed: v.optional(v.string()),
      duration: v.optional(v.number()),
      tokensUsed: v.optional(v.number()),
      cost: v.optional(v.number()),
    })),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const activityId = await ctx.db.insert("activities", {
      ...args,
      createdAt: Date.now(),
    });
    return activityId;
  },
});

// Update activity status
export const updateActivityStatus = mutation({
  args: {
    id: v.id("activities"),
    status: v.string(),
    completedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      completedAt: args.completedAt ?? Date.now(),
    });
  },
});

// Get activities by date range
export const getActivitiesByDateRange = query({
  args: {
    startDate: v.number(),
    endDate: v.number(),
  },
  handler: async (ctx, args) => {
    const activities = await ctx.db
      .query("activities")
      .withIndex("by_createdAt")
      .filter((q) => q.gte("createdAt", args.startDate).and(q.lte("createdAt", args.endDate)))
      .collect();
    return activities;
  },
});
