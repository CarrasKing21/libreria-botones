import React from 'react';
import './ComponentShowcase.css';

function ComponentShowcase({ title, description, code, children }) {
  return (
    <div className="showcase-container">
      <h2 className="showcase-title">{title}</h2>
      {description && <p className="showcase-description">{description}</p>}
      <div className="showcase-preview">
        {children}
      </div>
      <div className="showcase-code">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export default ComponentShowcase;