import React from 'react';
import './styles.css';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_FEED = gql`
    query feed($offset: Int, $limit: Int) {
      feed(offset: $offset, limit: $limit) {
        title
        body
        author {
          name
          email
        }
      }
    }`;

export const Feed = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_FEED, {
    variables: {
      offset: 0,
      limit: 3,
    }
  });

  if (loading) {
    return <div className="container">Loading...</div>
  }

  if (data && data.feed) {
    return (
      <div className="container">
        {data.feed.map(post => (
          <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
          )
        )}
        <button onClick={() =>
          fetchMore({
            variables: {
              offset: data.feed.length,
              limit: 3,
            },
            updateQuery: (prev, { fetchMoreResult, ...rest }) => {
              if (!fetchMoreResult) return prev;
              return {
                ...prev,
                feed: [ ...prev.feed, ...fetchMoreResult.feed]
              }
            },
        })}>Load More</button>
      </div>
    );
  }
  return (
    <div className="container">
      Hello there!
    </div>
  )
};