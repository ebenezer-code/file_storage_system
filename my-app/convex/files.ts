import { ConvexError, v } from "convex/values";
import { mutation, query, QueryCtx, MutationCtx } from "./_generated/server";

import { getUser } from "./users";

async function hasAccesstoOrg(ctx: QueryCtx | MutationCtx, tokenIdentifier: string, orgID: string) {
    const user = await getUser(ctx, tokenIdentifier);
    const hasAccess = user.orgIds.includes(orgID) || user.tokenIdentifier.includes(orgID);
    return hasAccess;
}

export const createFile = mutation({
    args: {
        name: v.string(),
        orgID: v.string(),
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