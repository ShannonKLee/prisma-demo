import { getUserId } from '../utils/getUserId';

const Query = {
    async me(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        return await prisma.query.users({
            where: {
                id: args.id
            }
        }, info);
    },
    async post(parent, args, { prisma, request }, info) {
        const userId = getUserId(request, false);
        const posts = await prisma.query.posts({
            where: {
                id: args.id,
                OR: [{
                    published: true
                }, {
                    author: { 
                        id: userId 
                    }
                }]
            }
        });

        if (posts.length === 0) {
            throw new Error("Unable to find post");
        }

        return posts[0];
    },
    greeting(parent, args, { db }, info) {
        if (args.name) {
            return `Hello there, ${args.name}`;
        }
        return `Hi, you're #${args.id}`;
    },
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
    async myPosts(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const opArgs = {
            where: {
                author: {
                    id: userId
                }
            }
        };

        if (args.query) {
            opArgs.where.OR = [{
                body_contains: args.query
            }, {
                title_contains: args.query
            }]
        }

        return await prisma.query(opArgs, info);
    },
    scalarArray() {
        return ["91", "92", "93"];
    },
    sum(parent, args, { db }, info) {
        if (args.numbers.length === 0) {
            return 0;
        }
        return args.numbers.reduce((accumulator, currentValue) => accumulator + currentValue);
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
    comments(parent, args, { prisma }, info) {
        return prisma.query.comments(null, info);
    }
};

export default Query;