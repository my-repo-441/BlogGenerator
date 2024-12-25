# AI-Powered Blog Content Generation Pipeline

This project is an AI-powered blog content generation pipeline that automates the process of creating and publishing blog posts using various AI services and web scraping techniques.

The application consists of a Flask-based backend API and a React-based frontend. It leverages OpenAI's GPT models, Bing Search API, and WordPress integration to streamline the content creation process.

## Repository Structure

```
.
├── backend/
│   ├── app.py                 # Main Flask application entry point
│   ├── blueprints/            # API route definitions
│   ├── config.py              # Configuration settings
│   ├── data/                  # Stored data (e.g., scraped results)
│   └── services/              # Core functionality implementations
├── frontend/
│   ├── index.html             # Main HTML file
│   ├── package.json           # Frontend dependencies and scripts
│   ├── src/                   # React application source code
│   │   ├── App.jsx            # Main React component
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Page-level React components
│   │   └── styles/            # CSS stylesheets
│   └── vite.config.js         # Vite configuration for development
└── README.md
```

## Usage Instructions

### Prerequisites

- Python 3.7+
- Node.js 14+
- OpenAI API key
- Bing Search API key
- WordPress site with API access

### Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the `backend` directory with the following content:
   ```
   OPENAI_API_KEY=your_openai_api_key
   BING_API_KEY=your_bing_api_key
   WP_URL=your_wordpress_site_url
   WP_USER=your_wordpress_username
   WP_APP_PASSWORD=your_wordpress_app_password
   ```

5. Run the Flask application:
   ```
   python app.py
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

### Using the Application

1. Open your browser and navigate to `http://localhost:5173` (or the URL provided by Vite).
2. Use the navigation menu to access different features:
   - Home: Overview of the application
   - Fetch Content: Search for and scrape content based on a given topic
   - Generate Blog: Create a blog post using the fetched content and AI-generated text

## Data Flow

The application follows this general data flow:

1. User inputs a topic on the frontend.
2. Frontend sends a request to the backend API.
3. Backend uses Bing Search API to find relevant articles.
4. Backend scrapes content from allowed URLs.
5. OpenAI's GPT model generates blog content based on scraped data.
6. Generated content is posted to WordPress via API.
7. Results are sent back to the frontend for display.

```
[User] -> [Frontend] -> [Backend API] -> [Bing Search API]
                                      -> [Web Scraping]
                                      -> [OpenAI API]
                                      -> [WordPress API]
         [Frontend] <- [Backend API] <- [Results]
```

## Troubleshooting

### Common Issues

1. API Key Issues:
   - Problem: "Invalid API key" or "Unauthorized" errors
   - Solution: Double-check your API keys in the `.env` file and ensure they are correctly set

2. CORS Errors:
   - Problem: "Access-Control-Allow-Origin" errors in the browser console
   - Solution: Ensure the Flask CORS settings are correct in `app.py` and the Vite proxy settings are properly configured in `vite.config.js`

3. Scraping Failures:
   - Problem: "Unable to scrape content" or empty results
   - Solution: Check the `robots.txt` file of the target websites and ensure you're respecting their scraping policies

### Debugging

To enable debug mode for the Flask backend:

1. Set the `FLASK_ENV` environment variable:
   ```
   export FLASK_ENV=development
   ```
2. Run the Flask app with debug mode:
   ```
   python app.py
   ```

For frontend debugging:

1. Use the browser's developer tools (F12) to inspect network requests and console output.
2. Set breakpoints in your React components using the "Sources" tab in Chrome DevTools.

Log files can be found in:
- Backend: Check the console output where you ran `python app.py`
- Frontend: Check the browser console and the terminal where you ran `npm run dev`

## Performance Optimization

To optimize performance:

1. Monitor API response times using tools like Postman or the Network tab in browser DevTools.
2. Use caching mechanisms for frequently accessed data, such as scraped content or API responses.
3. Implement pagination for large datasets to reduce load times.
4. Consider using a task queue (e.g., Celery) for long-running operations like content generation.