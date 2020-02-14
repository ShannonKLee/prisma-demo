import { uuid } from 'uuidv4';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { getUserId } from '../utils/getUserId';
import { createAuthToken } from '../utils/createAuthToken';

const Mutation = {
   async createUser(parent, args, { prisma }, info) {
        if (args.data.password.length < 8) {
            throw new Error("Password must be at least 8 characters");
        }
        const password = await bcrypt.hash(args.data.password, 10);

        const user = await prisma.mutation.createUser({ 
            data: { 
                ...args.data,
                password
            }
        });

        return {
            user,
            token: createAuthToken(user.id),
        };

        // const { name, email, age } = args.data;
        // const isEmailTaken = db.users.some(user => user.email === email);
        // if (isEmailTaken) {
        //     throw new Error(`Email ${email} is already taken!`);
        // }
        // const user = {
        //     id: uuid(),
        //     ...args.data,
        // };
        // db.users.push(user);
        // return user;
    },
    async createPost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        
        return await prisma.mutation.createPost({ 
            data: { 
                author: {
                    connect: {
                        id: userId
                    }
                },
                title: args.data.title,
                body: args.data.body,
                published: args.data.published
             }
        }, info);
        // const userExists = db.users.some((user) => user.id == args.data.author);
        // if (!userExists) {
        //     throw new Error('User does not exist!');
        // }
        // const post = {
        //     id: uuid(),
        //     ...args.data,
        // };
        // if (post.published) {
        //     pubsub.publish('post', { 
        //         post: {
        //             mutation: 'CREATE',
        //             data: post,
        //         }
        //     });
        // }
        // db.posts.push(post);
        // return post;
    },
    async createComment(parent, args, { prisma, request }, info) {
        const postExists = await prisma.exists.Post({
            id: args.data.post,
            published: true
        });

        if (!postExists) {
            throw new Error("Post does not exist");
        }
        
        const userId = getUserId(request);
        return await prisma.mutation.createComment({ 
            data: {
                text: args.data.text,
                post: {
                    connect: {
                        id: args.data.post
                    }
                },
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
         }, info);
        // // Validation
        // const userExists = db.users.some((user) => user.id == args.data.author);
        // if (!userExists) {
        //     throw new Error('User does not exist!');
        // }

        // const isValidPost = db.posts.some((post) => (post.id == args.data.post && post.published));
        // if (!isValidPost) {
        //     throw new Error('Invalid post');
        // }

        // const comment = {
        //     id: uuid(),
        //     ...args.data,
        // };
        // db.comments.push(comment);
        // pubsub.publish(`comment ${args.data.post}`, { 
        //     comment: {
        //         mutation: 'CREATE',
        //         data: comment,
        //     }
        // });
        // return comment;
    },
    async deleteUser(parent, args, { prisma, request }, info) {
        // const userExists = await prisma.exists.User({ id: args.id });
        // if (!userExists) {
        //     throw new Error("User does not exist!");
        // }
        const userId = getUserId(request);
        return prisma.mutation.deleteUser({ where: 
            { 
                id: userId
            }
        }, info);
        // const user = db.users.find(user => user.id == args.id);
        // if (!user) {
        //     throw new Error("User does not exist!");
        // }

        // db.users = db.users.filter(user => user.id != args.id);
        // db.posts = db.posts.filter(post => {
        //     const deletePost = post.author == args.id;
        //     if (deletePost) {
        //         db.comments = db.comments.filter(comment => comment.post != post.id);
        //     }
        //     return deletePost;
        // });
        // db.comments = db.comments.filter(comment => comment.author != args.id);
        // return user;
    },
    async deletePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const isPostOwner = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        });

        if (!isPostOwner) {
            throw new Error("Unable to find post");
        }

        return await prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info);
        // const post = db.posts.find(post => post.id == args.id);
        // if (!post) {
        //     throw new Error("Post does not exist!");
        // }
        
        // db.posts = db.posts.filter(post => post.id != args.id);
        // db.comments = db.comments.filter(comment => comment.post != args.id);
        // if (post.published) {
        //     pubsub.publish('post', {
        //         post: {
        //             mutation: 'DELETE',
        //             data: post,
        //         }
        //     })
        // }
        // return post;
    },
    async deleteComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const isCommentOwner = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        });

        if (!isCommentOwner) {
            throw new Error("Unable to find comment");
        }

        return await prisma.mutation.deleteComment({ where: {
            id: args.id }
        }, info);
        // const comment = db.comments.find((comment) => comment.id == args.id);
        // if (!comment) {
        //     throw new Error("Comment does not exist!");
        // }

        // db.comments = db.comments.filter(comment => comment.id != args.id);
        // pubsub.publish(`comment ${comment.post}`, {
        //     comment: {
        //         mutation: 'DELETE',
        //         data: comment,
        //     }
        // })
        // return comment;
    },
    async updateUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: {
                ...args.data
            }
        });
        // const { email, name, age } = args.data;
        // const user = db.users.find(user => user.id == args.id);
        // if (!user) {
        //     throw new Error("User does not exist!");
        // }

        // if (email) {
        //     const emailTaken = db.users.some(user => user.email == email);
        //     if (emailTaken) {
        //         throw new Error("Email is already taken!");
        //     }

        //     user.email  = email;
        // }

        // if (age) {
        //     user.age = age;
        // }

        // if (name) {
        //     user.name = name;
        // }

        // return user;
    },
    async updatePost(parent, args, { prisma, request }, info) {
        const postPublished = await prisma.exists.Post({ 
            id: args.id,
            published: true
         });

         if (postPublished && (typeof args.data.published === 'boolean' && !args.data.published)) {
             await prisma.mutation.deleteManyComments({
                 where: {
                     post: {
                         id: args.id
                     }
                 }
             });
         }
        
        const userId = getUserId(request);
        const isPostOwner = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        });

        if (!isPostOwner) {
            throw new Error("Unable to find post");
        }
        
        return await prisma.mutation.updatePost({
            where: {
                id: args.id
            },
            data: args.data
        }, info);
        // const { title, body, published } = args.data;
        // const post = db.posts.find(post => post.id == args.id);
        // const originalPost = { ...post };
        // if (!post) {
        //     throw new Error("Post does not exist!");
        // }
        // if (title) {
        //     post.title = title;
        // }
        // if (body) {
        //     post.body = body;
        // }
        // if (typeof published == 'boolean') {
        //     post.published = published;
        //     if (post.published && !originalPost.published) {
        //         pubsub.publish('post', {
        //             post: {
        //                 mutation: 'CREATE',
        //                 data: post
        //             }
        //         });
        //     } else if (originalPost.published && !post.published) {
        //         pubsub.publish('post', {
        //             post: {
        //                 mutation: 'DELETE',
        //                 data: originalPost
        //             }
        //         });
        //     } else {
        //         pubsub.publish('post', {
        //             post: {
        //                 mutation: 'UPDATE',
        //                 data: post
        //             }
        //         });
        //     }

        // }
        // return post;
    },
    async updateComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const isCommentOwner = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        });

        if (!isCommentOwner) {
            throw new Error("Unable to find comment");
        }
        
        return await prisma.mutation.updateComment({
            where: {
                id: args.id
            },
            data: args.data
        }, info);
        // const comment = db.comments.find(comment => comment.id = args.id);
        // if (!comment) {
        //     throw new Error("Comment does not exist!");
        // }
        // if (args.data.text) {
        //     comment.text = args.data.text;
        // }
        // pubsub.publish(`comment ${comment.post}`, {
        //     comment: {
        //         mutation: 'UPDATE',
        //         data: comment
        //     }
        // })
        // return comment;
    },
    async login(parent, args, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        });

        if (!user) {
            throw new Error("User does not exist!");
        }

        const isCorrectPassword = await bcrypt.compare(args.data.password, user.password);
        if (!isCorrectPassword) {
            throw new Error("Passwords do not match!");
        }

        return {
            user,
            token: createAuthToken(user.id),
        };
    }
};

export default Mutation;