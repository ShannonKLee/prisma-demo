import { getUserId } from '../utils/getUserId';
import prisma from '../prisma';

const User = {
    email: {
        fragment: 'fragment userId on User { id }',
        resolve(parent, args, { request }, info) {
            const userId = getUserId(request);
            if (userId && userId === parentId) {
                return parent.email;
            }
            return null;
        }
    },
    posts: {
        fragment: 'fragment userId on User { id }',
        async resolve(parent, args, { request }, info) {
            return await prisma.query.posts({
                where: {
                    published: true,
                    author: {
                        id: parent.id
                    }
                }
            });
        }
    }
};

export default User;