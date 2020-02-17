import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/index';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
    fragmentReplacements,
});

export default prisma;

// prisma.query.users(null, '{ id name email posts { id title }}').then((data) => {
//     console.log(JSON.stringify(data));
// });

// prisma.query.comments(null, '{ id text author { id name }}').then((data) => {
//     console.log(JSON.stringify(data));
// });

// prisma.mutation.createPost({
//     data: {
//         title: "New thing",
//         body: "I'm cool",
//         published: true,
//         author: {
//             connect: {
//                 id: "ck4kc2rv4001b0710lwnvnpr7"
//             }
//         }
//     }
// }, '{ id title body }').then((data) => {
//     console.log(JSON.stringify(data));
//     return prisma.query.users(null, '{ id name email posts { id title }}');
// }).then((data) => {
//     console.log(JSON.stringify(data));
// });

const createPostForUser = async (authorId, data) => {
    const userExists = await prisma.exists.User({
        id: authorId
    });

    if (!userExists) {
        throw new Error("User does not exist!");
    }

    const user = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ author { id name email posts { id title published } } }');
    return user;
}

const updatePostForUser = async (postId, data) => {
    const postExists = await prisma.exists.Post({ id: postId });

    if (!postExists) {
        throw new Error("Post does not exist!");
    }

    const user = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data: {
            ...data
        }
    }, '{ author { id name email posts { id title published } } }');
    return user;
}

// updatePostForUser('ck4km8bgn00440710o41qofj1', {
//     published: true,
//     body: "Let's try this again shall we"
// }).then((data) => {
//     console.log(data);
// });

createPostForUser('ck4kc2rv4001b0710lwnvnpr7', {
    title: "hello from the other side",
    body: "I must have called a thousand times",
    published: false,
}).then((user) => {
    console.log(JSON.stringify(user))
}).catch((error) => {
    console.log(error.message);
});

// prisma.exists.Post({
//     id: 'hahaha'
// }).then((exists) => {
//     console.log(exists);
// });