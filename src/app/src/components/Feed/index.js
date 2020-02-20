import React from 'react';
import FeedItem from './FeedItem';
import Button from '../Button';
import Error from '../Error';
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

  return (
    <div className="container">
      {loading && <span>Loading...</span>}
      {(data && data.feed) && 
        (
          <div>
            {data.feed.map(post => (
              <FeedItem post={post} />
            ))}
            <Button 
              text="Load More"
              onClick={() =>
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
            })}
          />
          </div>
        )
      }
      {error && <Error msg="Something went wrong! Please try again later."/>}
    </div>
  );
};