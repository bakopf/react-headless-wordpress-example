import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import wordpressApiUrl from '../config';

const BlogPostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${wordpressApiUrl}/posts/${postId}`);
        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>{post.title.rendered}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetails;
