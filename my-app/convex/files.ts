import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile = mutation({
args: {
    name: v.string(),
},
async handler(ctx, args) {
    
}
})

export const getFile = query ({
    args: {},
    async handler(ctx, args) {

    }
})