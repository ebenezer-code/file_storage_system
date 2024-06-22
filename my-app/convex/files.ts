import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile = mutation({
    args: {name: v.string(),},
    async handler(ctx, args) {
        const userIdentity = await ctx.auth.getUserIdentity();
        if(!userIdentity) {
            throw new ConvexError("Must login");
        }
        await ctx.db.insert("files", {
            name: args.name,
        });
    },
});

export const getFiles = query({
    args: {},
    async handler(ctx, args){
        const userIdentity = await ctx.auth.getUserIdentity();
        if(!userIdentity) {
            throw new ConvexError("Must login");
        }
        return ctx.db.query("files").collect();
    },
});