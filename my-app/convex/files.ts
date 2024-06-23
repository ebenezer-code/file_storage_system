import { ConvexError, v } from "convex/values";
import { mutation, query, QueryCtx, MutationCtx } from "./_generated/server";

import { getUser } from "./users";

export const generateUploadUrl = mutation(async (ctx) => {
    const  userIdentity = await ctx.auth.getUserIdentity();
  
        if(!userIdentity) {
            throw new ConvexError("Must login in");
        }
    return await ctx.storage.generateUploadUrl();
});


async function hasAccesstoOrg(ctx: QueryCtx | MutationCtx, tokenIdentifier: string, orgID: string) {
    const user = await getUser(ctx, tokenIdentifier);
    const hasAccess = user.orgIds.includes(orgID) || user.tokenIdentifier.includes(orgID);
    return hasAccess;
}

export const createFile = mutation({
    args: {
        name: v.string(),
        orgID: v.string(),
        fileId: v.id("_storage"),
    },

    async handler(ctx, args) {
        const  userIdentity = await ctx.auth.getUserIdentity();
  
        if(!userIdentity) {
            throw new ConvexError("Must login in");
        }
        const hasAccess = await hasAccesstoOrg(ctx, userIdentity.tokenIdentifier, args.orgID);

        if(!hasAccess) {
            throw new ConvexError("you do not have acccess to this org");
        }

        await ctx.db.insert("files", {
            name: args.name,
            orgID: args.orgID,
            fileId: args.fileId,
        });
    },
});



export const getFiles = query({
    args: {
        orgID: v.string(),
    },
    async handler(ctx, args){
        const userIdentity = await ctx.auth.getUserIdentity();

        if(!userIdentity) {
            return [];
        }
        const hasAccess = await hasAccesstoOrg(ctx, userIdentity.tokenIdentifier, args.orgID);
        
        if(!hasAccess) {
            return [];
        }

        return ctx.db.query("files")
        .withIndex("by_orgID", (q) => q.eq("orgID", args.orgID))
        .collect();
    },
});


export const deleteFile = mutation({
    args: { fileId: v.id("files") ,},
    async handler(ctx, args) {
        const  userIdentity = await ctx.auth.getUserIdentity();
  
        if(!userIdentity) {
            throw new ConvexError("Must login in");
        }

        const file = await ctx.db.get(args.fileId);

        if(!file) {
            throw new ConvexError("No file found");
        }
        const hasAccess = await hasAccesstoOrg(ctx, userIdentity.tokenIdentifier, file.orgID);
        if(!hasAccess) {
           throw new ConvexError("You do not have access to delete this file!");
        }
    

        await ctx.db.delete(args.fileId);

    },
})