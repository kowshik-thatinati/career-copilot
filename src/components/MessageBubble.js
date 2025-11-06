import React from 'react';

function MessageBubble({ sender, text }) {
  const isUser = sender === 'user';
  
  // Format text to handle basic markdown-like patterns
  const formatText = (text) => {
    if (!text) return '';
    
    // Split by lines
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // Handle bullet points (*, -, •)
      if (line.trim().match(/^[\*\-•]\s/)) {
        const content = line.replace(/^[\*\-•]\s/, '').trim();
        return (
          <div key={index} style={{ marginLeft: '1.5em', textIndent: '-1.5em', marginBottom: '0.5em' }}>
            <span style={{ marginRight: '0.5em' }}>•</span>
            {content}
          </div>
        );
      }
      
      // Handle bold text **text**
      let formattedLine = line;
      const boldRegex = /\*\*(.+?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(formattedLine)) !== null) {
        if (match.index > lastIndex) {
          parts.push(formattedLine.substring(lastIndex, match.index));
        }
        parts.push(<strong key={`bold-${index}-${match.index}`}>{match[1]}</strong>);
        lastIndex = match.index + match[0].length;
      }
      
      if (lastIndex < formattedLine.length) {
        parts.push(formattedLine.substring(lastIndex));
      }
      
      return (
        <div key={index} style={{ marginBottom: line.trim() ? '0.5em' : '0.25em' }}>
          {parts.length > 0 ? parts : formattedLine}
        </div>
      );
    });
  };
  
  return (
    <div className={`chat-bubble ${isUser ? 'user' : 'bot'}`}>
      {formatText(text)}
    </div>
  );
}

export default MessageBubble;
