import React from 'react';

function MessageBubble({ sender, text }) {
  const isUser = sender === 'user';
  
  // Format text to handle basic markdown-like patterns
  const formatText = (text) => {
    if (!text) return '';
    
    // Helper function to process bold text in a string
    const processBoldText = (str, lineIndex) => {
      const boldRegex = /\*\*(.+?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(str)) !== null) {
        if (match.index > lastIndex) {
          parts.push(str.substring(lastIndex, match.index));
        }
        parts.push(<strong key={`bold-${lineIndex}-${match.index}`}>{match[1]}</strong>);
        lastIndex = match.index + match[0].length;
      }
      
      if (lastIndex < str.length) {
        parts.push(str.substring(lastIndex));
      }
      
      return parts.length > 0 ? parts : str;
    };
    
    // Split by lines
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // Handle markdown headers (###, ##, #)
      const headerMatch = line.trim().match(/^(#{1,3})\s+(.+)$/);
      if (headerMatch) {
        const level = headerMatch[1].length;
        const content = headerMatch[2];
        const formattedContent = processBoldText(content, index);
        const fontSize = level === 1 ? '1.5em' : level === 2 ? '1.3em' : '1.1em';
        const marginTop = level === 1 ? '1em' : '0.8em';
        return (
          <div key={index} style={{ 
            fontSize, 
            fontWeight: 'bold', 
            marginTop, 
            marginBottom: '0.5em' 
          }}>
            {formattedContent}
          </div>
        );
      }
      
      // Handle bullet points (*, -, •, •*)
      const bulletMatch = line.trim().match(/^([*\-•]|•\*)\s*(.*)$/);
      if (bulletMatch) {
        const content = bulletMatch[2].trim();
        const formattedContent = processBoldText(content, index);
        return (
          <div key={index} style={{ marginLeft: '1.5em', textIndent: '-1.5em', marginBottom: '0.5em' }}>
            <span style={{ marginRight: '0.5em' }}>•</span>
            {formattedContent}
          </div>
        );
      }
      
      // Handle bold text **text** for non-bullet lines
      const formattedLine = processBoldText(line, index);
      
      return (
        <div key={index} style={{ marginBottom: line.trim() ? '0.5em' : '0.25em' }}>
          {formattedLine}
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
