import 'dotenv/config'; // Importing the dotenv package to load environment variables from a .env file
import express from 'express'; // Importing the express package to create a web server
import cors from 'cors'; // Importing the cors package to enable Cross-Origin Resource Sharing
import axios from 'axios'; // Importing the axios package to make HTTP requests
import OpenAI from 'openai'; // Importing the OpenAI package for natural language processing

const app = express(); // Creating an instance of the express application
const PORT = 3001; // Setting the port number for the server to listen on

app.use(cors()); // Using the cors middleware to allow cross-origin requests
app.use(express.json()); // Using the express.json middleware to parse JSON request bodies

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Initializing the OpenAI client with the API key from the environment variables
});

app.post('/api/getVerse', async (req, res) => {
  const { mood, text } = req.body; // Extracting the mood and text from the request body
  console.log('Received request:', { mood, text }); // Logging the received request

  try {
    // Step 1: Get valid verse suggestion (with retries)
    console.log('Getting verse suggestion...');
    const verseSuggestion = await getValidVerseSuggestion(mood, text); // Calling a function to get a valid verse suggestion
    console.log('Valid verse suggestion:', verseSuggestion);

    // Step 2: Fetch verse from Bible API
    console.log('Fetching verse from Bible API...');
    const bibleApiResponse = await fetchVerseFromBibleApi(verseSuggestion); // Calling a function to fetch the verse from a Bible API
    console.log('Bible API Response:', bibleApiResponse);

    // Step 3: Prepare response
    const response = {
      text: bibleApiResponse.text,
      reference: bibleApiResponse.reference,
      translation_name: bibleApiResponse.translation_name
    }; // Creating a response object with the fetched verse data
    console.log('Prepared response:', response);

    // Step 4: Send response
    res.json(response); // Sending the response as JSON
  } catch (error) {
    console.error('Error in /api/getVerse:', error); // Logging any errors that occur
    console.error(error.stack);
    res.status(500).json({ error: error.message, stack: error.stack }); // Sending an error response with the error message and stack trace
  }
});

async function getValidVerseSuggestion(mood, text, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const suggestion = await getVerseSuggestion(mood, text); // Calling a function to get a verse suggestion
      if (isValidVerseReference(suggestion)) { // Checking if the suggestion is a valid verse reference
        return suggestion; // Returning the valid verse suggestion
      }
      console.log(`Attempt ${i + 1}: Invalid verse suggestion, retrying...`); // Logging the retry attempt
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error); // Logging any errors that occur during the retry attempts
      if (i === maxRetries - 1) throw error; // Throwing the error if it's the last retry attempt
    }
  }
  throw new Error('Failed to get a valid verse suggestion after multiple attempts'); // Throwing an error if a valid verse suggestion couldn't be obtained after multiple attempts
}

async function getVerseSuggestion(mood, text) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // Using the GPT-3.5-turbo model for generating verse suggestions
    messages: [
      {role: "system", content: "You are a helpful assistant designed to output JSON."},
      {role: "user", content: `Suggest only the Bible verse in this format (John 3:16) for someone who is feeling ${mood} and mentioned: ${text}`},
    ], // Providing system and user messages for the chat-based completion
  });

  try {
    const suggestion = JSON.parse(completion.choices[0].message.content); // Parsing the verse suggestion from the OpenAI response
    return suggestion.bible_verse; // Returning the extracted verse suggestion
  } catch (error) {
    console.error('Error parsing OpenAI response:', error); // Logging any errors that occur during parsing
    throw new Error('Failed to parse verse suggestion'); // Throwing an error if the verse suggestion couldn't be parsed
  }
}

function isValidVerseReference(reference) {
  // Basic validation: Check if the reference matches the pattern "Book Chapter:Verse"
  const pattern = /^[1-3]?\s?[A-Za-z]+\s\d+:\d+$/; // Regular expression pattern for validating verse references
  return pattern.test(reference); // Checking if the reference matches the pattern
}

async function fetchVerseFromBibleApi(verseReference) {
  const response = await axios.get(`https://bible-api.com/${encodeURIComponent(verseReference)}`); // Making a GET request to a Bible API to fetch the verse data
  return response.data; // Returning the fetched verse data
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Starting the server and logging the port number
