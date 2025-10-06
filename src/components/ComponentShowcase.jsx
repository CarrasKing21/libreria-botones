import React, { useState } from 'react';
import './ComponentShowcase.css';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, solarizedlight } from 'react-syntax-highlighter/dist/cjs/styles/prism';


function ComponentShowcase({ title, description, code, children, theme }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Vuelve al estado original después de 2s
    }).catch(err => {
      console.error('Error al copiar el código: ', err);
    });
  };

  return (
    <div className="showcase-container">
      <h2 className="showcase-title">{title}</h2>
      {description && <p className="showcase-description">{description}</p>}
      <div className="showcase-preview">
        {children}
      </div>
      <div className="showcase-code">
        <button onClick={handleCopy} className={`copy-button ${isCopied ? 'copied' : ''}`} title="Copiar código">
          {isCopied ? <IconCheck size={16} /> : <IconCopy size={16} />}
        </button>
        <SyntaxHighlighter
          language="jsx"
          style={theme === 'dark' ? vscDarkPlus : solarizedlight}
          customStyle={{
            margin: 0,
            padding: '20px',
            border: 'none',
            boxShadow: 'none',
          }}
          codeTagProps={{ style: { fontFamily: 'monospace' } }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default ComponentShowcase;