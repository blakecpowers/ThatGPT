import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// Create an instance of OpenAI
const openai = new OpenAIApi(configuration);

// Initialize express applicaiton.
const app = express();

// Set up middleware with cors and allow JSON to be passed.
app.use(cors());
app.use(express.json());

// Create a dummy route.
app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from ThatGPT',
    })
})

// Create a post route to allow for a body/payload.
app.post('/', async (req, res) => {
    try {
        // The prompt is the text we'll be passing from the request into ChatGPT.
        const prompt = req.body.prompt;

        // The following is a template copy and pasted from ChatGPT's API tutorial. 
        // We're using the text-davinci as our model. 
        // Passing the prompt (text area from front end).
        // Passing a low temperature to have low risk.
        // Max tokens set to 3000 which means it can give longer responses.
        // Frequence penalty of 0.5 so it's less likely to give repetitive answers.
        // A presence of 0 because we don't care how long is gets.
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0, // Higher values means the model will take more risks.
            max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
            top_p: 1, // alternative to sampling with temperature, called nucleus sampling
            frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
            presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
          });
      
          // Send back the response with the following data.
          res.status(200).send({
            bot: response.data.choices[0].text
          });
      
     } catch (error) {
        // If an error is thrown catch it and send a 500 response.
        console.log(error);
        res.status(500).send({error})
     }
});

// Make sure our app is always listening for new requests.
app.listen(7050, () => {
    console.log('Server us running on port http://localhost:7050')
})