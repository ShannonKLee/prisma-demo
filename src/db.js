const posts = [
    {
        id: 1,
        title: 'My first post',
        body: 'this is a post',
        published: true,
        author: 1,
    },
    {
        id: 2,
        title: 'My second post',
        body: 'this is a post again',
        published: false,
        author: 2,
    },
];

const users = [
    {
        id: 1,
        name: 'Shannon',
        email: 'shannon@example.com',
        age: 25,
    },
    {
        id: 2,
        name: 'Katherine',
        email: 'katherine@example.com',
        age: 24,
    },
]

const comments = [
    {
        id: 1,
        text: 'This is a comment',
        author: 1,
        post: 1,
    },
    {
        id: 2,
        text: 'This is my second comment',
        author: 2,
        post: 2,
    },
    {
        id: 3,
        text: 'I have nothing more to say',
        author: 2,
        post: 2,
    },
    {
        id: 4,
        text: 'I promise this is the last one',
        author: 1,
        post: 2,
    },
];

const db = {
    posts,
    comments,
    users
};

export default db;