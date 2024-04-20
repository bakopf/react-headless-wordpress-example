import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import wordpressApiUrl from '../config';

const BlogPost = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${wordpressApiUrl}/posts?per_page=5`);
        const postData = await response.json();
        setBlogPosts(postData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <h2>Blog Posts</h2>
          {blogPosts.map(post => (
            <div key={post.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{post.title.rendered}</h5>
                <p className="card-text">{post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "").substring(0, 100)}</p>
                <p className="card-text"><small className="text-muted">Author: {post.author}</small></p>
                <Link to={`/post/${post.id}`} className="btn btn-primary">Read More</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
