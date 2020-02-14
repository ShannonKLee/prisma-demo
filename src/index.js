import { GraphQLServer, PubSub } from 'graphql-yoga';
import { getPackedSettings } from 'http2';
import db from './db';
import prisma from './prisma';
import { resolvers, fragmentReplacements } from './resolvers/index';


/* TODO:
1. Use uuid4 library to generate IDs - DONE
2. Object spread operator plugin - DONE
3. Input types for all 3 create mutations DONE
4. Test creation queries DONE
5. Deletion queries. From most complicated to least complicated: users, posts, comments DONE
6. Separate resolvers and schema into separate files. src/resolvers/Query.js for example and src/schema.graphql
7. Nodemon? So you'll be able to update your files and nodemon will update in realtime
8. Mutations to update user, post, and comment

*/

// Scalar Types: String, Boolean, Float, Int, ID (any unique identifiers)
// Scalars store single values 

// If I use "24" for the resolver value for age, it gets converted to an integer. But if I try words, it will show an error

/* Queries
1. me and post: custom type
2. greeting: arguments
3. posts: returning an array of custom types
4. scalarArray: returning an array of scalar type
5. sum: array as argument
*/

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql', 
    resolvers,
    context(request) {
        return {
            db,
            pubsub,
            prisma,
            request
        }
    },
    fragmentReplacements,
});

server.start(() => 
    console.log("server is running!")
);