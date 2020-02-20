import { getUserId } from '../utils/getUserId';
import prisma from '../prisma';

const User = {
    posts: {
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