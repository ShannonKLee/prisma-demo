import { getUserId } from '../utils/getUserId';

const Subscription = {
    post: {
        subscribe(parent, args, { prisma }, info) {
            // return pubsub.asyncIterator('post');
            return prisma.subscription.post({
                where: {
                    node: {
                        published: true
                    }
            }}, info);
        }
    },
}

export default Subscription;