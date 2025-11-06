const STORAGE_KEY = 'copilotChatHistory';

export function loadHistory() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [{
    id: 'default',
    title: 'Default Chat',
    messages: [{ sender: 'bot', text: 'Hi User' }],
  }];
}

export function saveHistory(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}