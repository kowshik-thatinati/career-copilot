import React from 'react';

function MessageBubble({ sender, text }) {
  const isUser = sender === 'user';
  return (
    <div className={`chat-bubble ${isUser ? 'user' : 'bot'}`}>
      {text}
    </div>
  );
}

export default MessageBubble;
