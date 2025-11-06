# Career Compass Backend

Express.js server providing API endpoints for the Career Compass application.

## API Endpoints

### Health Check
- **GET** `/api/health` - Check server status

### Gemini AI
- **POST** `/api/gemini` - Send prompt to Gemini AI
  ```json
  {
    "prompt": "Your career question here"
  }
  ```

### Title Generation
- **POST** `/api/generate-title` - Generate conversation title
  ```json
  {
    "message": "First message of conversation"
  }
  ```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_api_key_here
   ```

3. Run the server:
   ```bash
   npm start
   ```

   Or with auto-reload:
   ```bash
   npm run dev
   ```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `GEMINI_API_KEY` - Your Google Gemini API key

## Dependencies

- `express` - Web framework
- `cors` - Enable CORS
- `axios` - HTTP client
- `body-parser` - Parse request bodies
- `dotenv` - Environment variables
