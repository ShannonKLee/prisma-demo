const Query = {
    // async post(parent, args, { prisma, request }, info) {
    //     const posts = await prisma.query.posts({
    //         where: {
    //             id: args.id,
    //             OR: [{
    //                 published: true
    //             }, {
    //                 author: { 
    //                     id: args.author
    //                 }
    //             }]
    //         }
    //     });

    //     if (posts.length === 0) {
    //         throw new Error("Unable to find post");
    //     }

    //     return posts[0];
    // },
   
    posts(parent, args, { prisma }, info) {
        const opArgs = {
            where: {
                published: true
            }
        };

        if (args.query) {
            opArgs.where.OR = [{
                body_contains: args.query
            }, {
                title_contains: args.query
            }]
        }

        return prisma.query.posts(opArgs, info);
        //return args.query ? db.posts.filter(post => post.body.includes(args.query)) : db.posts;
    },
    users(parent, args, { prisma }, info) {
        const opArgs = {};
        
        if (args.query) {
            opArgs.where = {
                name_contains: args.query
            }
        }
        return prisma.query.users(opArgs, info);
    },
    feed(parent, args, { prisma }, info) {
        return prisma.query.posts({
            first: args.limit,
            skip: args.offset,
        }, info);
    }
};

export default Query;