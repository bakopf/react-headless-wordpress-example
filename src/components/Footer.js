import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import wordpressApiUrl from '../config';

const Footer = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch(`${wordpressApiUrl}/pages?per_page=3`);
        const pagesData = await response.json();
        setPages(pagesData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPages();
  }, []);

  // Random contact information
  const contactInfo = {
    phone: "+1234567890",
    email: "example@example.com",
    address: "123 Street, City, Country",
  };

  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Contact Information</h5>
            <p>Phone: {contactInfo.phone}</p>
            <p>Email: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
            <p>Address: {contactInfo.address}</p>
          </div>
          <div className="col-md-6">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              {pages.map(page => (
                <li key={page.id}>
                  <Link to={`/${page.slug}`}>{page.title.rendered}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
