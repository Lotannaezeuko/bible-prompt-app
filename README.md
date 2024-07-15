# Mood-Based Bible Verse Chatbot

## Overview

This application is an interactive chatbot that provides users with relevant Bible verses based on their current mood or a given prompt. It combines the power of OpenAI's GPT model with a Bible API to offer personalized spiritual guidance.

## Features

- User input via text prompt or mood selection
- AI-powered verse suggestion using OpenAI's GPT model
- Fetching of full verse text from a Bible API
- Responsive React frontend
- Express.js backend server

## Tech Stack

- Frontend: React
- Backend: Express.js
- AI Model: OpenAI GPT-3.5-turbo
- External API: Bible API
- Testing: Jest and Selenium (planned)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- An OpenAI API key

## Installation

1. Clone the repository:
2. Install dependencies for both frontend and backend:
3. Set up environment variables:
Create a `.env` file in the backend directory and add your OpenAI API key:

## Starting the Application

To run the application, you need to start both the frontend and backend servers:

1. Start the backend server:
```npm run start:backend```

This will start the Express server, typically on port 3001.

2. In a new terminal, start the frontend:
```npm run start:frontend```
This will start the React development server, typically on port 3000.

3. Open your browser and navigate to `http://localhost:3000` to use the application.

## How to Use

1. On the home page, you can either:
- Type a prompt describing your current situation or feelings into the text box and click "Search".
- Click on one of the mood buttons to select a predefined emotion.

2. The application will process your input using the OpenAI API to suggest an appropriate Bible verse.

3. The suggested verse will be fetched from the Bible API and displayed on the results page.

4. You can return to the home page to make another query.

## Testing

(Note: Testing implementation is planned but not yet completed)

This application will be tested using Jest for unit and integration tests, and Selenium for end-to-end testing.

To run the tests (once implemented):
npm test

## Contact

If you have any questions or feedback, please contact Lotanna Ezeuko at lotannaezeuko12@gmail.com.
