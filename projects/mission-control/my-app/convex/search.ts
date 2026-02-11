import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Index a document for search
export const indexDocument = mutation({
  args: {
    title: v.string(),
    content: v.optional(v.string()),
    filePath: v.string(),
    fileType: v.string(),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("documents")
      .withIndex("by_filePath", (q) => q.eq("filePath", args.filePath))
      .first();
    
    const words = extractWords(args.title + " " + (args.content ?? ""));
    
    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        lastModified: Date.now(),
      });
      
      const searchIndex = await ctx.db
        .query("searchIndex")
        .filter((q) => q.eq("documentId", existing._id))
        .first();
      
      if (searchIndex) {
        await ctx.db.patch(searchIndex._id, {
          words,
          updatedAt: Date.now(),
        });
      }
      
      return existing._id;
    } else {
      const docId = await ctx.db.insert("documents", {
        ...args,
        lastModified: Date.now(),
      });
      
      await ctx.db.insert("searchIndex", {
        documentId: docId,
        words,
        updatedAt: Date.now(),
      });
      
      return docId;
    }
  },
});

// Global search across documents and activities
export const globalSearch = query({
  args: {
    query: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const searchWords = extractWords(args.query);
    const limit = args.limit ?? 20;
    
    // Search documents
    const docResults = await ctx.db
      .query("searchIndex")
      .withIndex("by_words")
      .filter((q) => {
        return searchWords.reduce((acc, word) => {
          return acc.or(q.eq("words", word));
        }, q.neq("words", ""));
      })
      .take(limit);
    
    const documents = await Promise.all(
      docResults.map((r) => ctx.db.get(r.documentId))
    );
    
    // Search activities
    const activities = await ctx.db
      .query("activities")
      .filter((q) => {
        return searchWords.reduce((acc, word) => {
          return acc.or(
            q.eq("title", word),
            q.eq("description", word)
          );
        }, q.neq("title", ""));
      })
      .take(limit);
    
    // Search scheduled tasks
    const tasks = await ctx.db
      .query("scheduledTasks")
      .filter((q) => {
        return searchWords.reduce((acc, word) => {
          return acc.or(
            q.eq("title", word),
            q.eq("description", word)
          );
        }, q.neq("title", ""));
      })
      .take(limit);
    
    return {
      documents: documents.filter(Boolean),
      activities: activities,
      tasks: tasks,
      totalResults: documents.length + activities.length + tasks.length,
    };
  },
});

// Get recent documents
export const getRecentDocuments = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const docs = await ctx.db
      .query("documents")
      .withIndex("by_lastModified")
      .order("desc")
      .take(args.limit ?? 20);
    return docs;
  },
});

function extractWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}
