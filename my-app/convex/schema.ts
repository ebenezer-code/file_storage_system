import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export const supportedFileTypes = v.union(v.literal("image"), v.literal("csv"), v.literal("pdf"), v.literal("docx")) ;



export default defineSchema({
  files: defineTable({ name: v.string(),type: supportedFileTypes , orgID: v.string(), fileId: v.id("_storage"), }).index("by_orgID", ["orgID"]),
  users: defineTable({ tokenIdentifier: v.string(), orgIds: v.array(v.string())}).index("by_tokenIdentifier", ["tokenIdentifier"]),
});