import React from 'react';

const FirstPageDetails = ({ page }) => {
  return (
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-12">
                <h2>{page.title.rendered}</h2>
                <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
                </div>
        </div>
    </div>
  );
};

export default FirstPageDetails;
