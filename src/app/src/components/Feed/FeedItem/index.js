import React from 'react';

import mail from './mail.png';
import './styles.css';

const FeedItem = ({ 
  post: {
    title,
    body,
    author: {
      name,
      email,
    },
  }
 }) => {
  const mailToLink = `mailto:${email}`;
  return (
    <div className="itemContainer"> 
      <div className="headerWrapper">
        <p className="postTitle">{title}</p>
        <a href={mailToLink}>
          <img src={mail} alt="Mail"/>
        </a>
      </div>
      <span className="author">By {name}</span>
      <p className="body">{body}</p>
    </div>
  );
 }

export default FeedItem;