require('dotenv').config();
const vision = require('@google-cloud/vision');
const axios = require('axios');

const client = new vision.ImageAnnotatorClient({
    keyFilename: 'keys.json'
});

async function detectLabels() {
    const [result] = await client.labelDetection('./images/canada_goose.jpg');

    // Convert the full result object to a JSON string
    const resultString = JSON.stringify(result);

    console.log('Vision Result Length of:', resultString.length);

    // Send to Grok API
    try {
        const grokResponse = await axios.post('https://api.x.ai/v1/chat/completions', {
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant machine that analyzes Google Cloud Vision API image results and returns 5 possible species."
                },
                {
                    role: "user",
                    content: `Analyze the following Google Cloud Vision API result and output exactly 5 possible species. Base your predictions solely on the data provided—do not guess or use external knowledge. Use the most accurate and relevant species names (common name followed by scientific name in parentheses) supported by the labels. Do not simply copy the label descriptions; synthesize the information to generate a reliable and meaningful prediction. Your response must be a single line with no extra text, formatted exactly as: species1 (scientific name), species2 (scientific name), species3 (scientific name), species4 (scientific name), species5 (scientific name). Each species must follow this format. Vision API result: ${resultString}`
                }
            ],
            model: "grok-3-mini",
            stream: false,
            temperature: 0
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.GROK}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('LLM Response:', grokResponse.data.choices[0].message.content);
    } catch (error) {
        console.error('Error calling Grok API:', error.response?.data || error.message);
    }
}

detectLabels();