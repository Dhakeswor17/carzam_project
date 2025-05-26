import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import multer from "multer";
import { parseStringPromise } from "xml2js";
import OpenAI from "openai";
import fs from 'fs/promises';
import { fileTypeFromBuffer } from 'file-type';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const regCheckUser = process.env.regCheckUser;

// Configure multer to save uploaded files to the "uploads/" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename by prefixing with a timestamp
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const uploads = multer({ storage });

// Function to get GPT-4 response via OpenAI
async function getOpenAiResponse(prompt) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const msg = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a JSON maker that extracts and calculates car values from provided data. Convert our regcheck data into the following exact JSON format i will give you example replace only the values in example. (and nothing else):
{
  "vehicle_health": "1-10",
  "safety_rating": "1-10",
  "prices": {
    "labels": ["Min Price", "Avg Price", "Max Price"],
    "datasets": {
      "label": "Car Prices",
      "data": ["minprice", "avgprice", "maxprice"],
      "backgroundColor": ["rgba(75,192,192,0.6)", "rgba(54,162,235,0.6)", "rgba(255,99,132,0.6)"],
      "barPercentage": 0.6,
      "categoryPercentage": 0.6
    }
  },
  "common_issues": {
    "Engine Misfire": 1-100,
    "Oil Leak": 1-100,
    "Battery Drain": 1-100,
    "Brake Wear": 1-100,
    "Transmission Slippage": 1-100,
    "AC Malfunction": 1-100,
    "Electrical Issues": 1-100,
    "Tire Pressure Loss": 1-100
  },
  "basic_info": {
    "Carmake": "",
    "Carmodel": "",
    "RegistrationYear": "",
    "BodyType": "",
    "FuelType": "",
    "Transmission": ""
  },
  "yearly_maintenance_cost": "",
  "image_url": ""
}
Respond with valid JSON only.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    return msg;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Error fetching response from OpenAI");
  }
}


async function getRegcheckResponse(selectedCountry, searchQuery) {
  const baseUrl = "https://regcheck.org.uk/api/reg.asmx";
  const regCheckUrl = `${baseUrl}/Check${selectedCountry}?RegistrationNumber=${searchQuery}&username=${regCheckUser}`;
  try {
    const response = await axios.get(regCheckUrl, { responseType: "text" });
    const parsedData = await parseStringPromise(response.data);
    const vehicleJson = parsedData.Vehicle.vehicleJson;
    if (vehicleJson) {
      console.log("vehicleJson", vehicleJson);
      return JSON.parse(vehicleJson);
    } else {
      throw new Error("vehicleJson not found in RegCheck response");
    }
  } catch (error) {
    console.error("Error fetching or parsing RegCheck data:", error.message);
    throw error;
  }
}

app.get("/openaiapi", async (req, res) => {
  const prompt = req.query.prompt || "tell me about volvo xc-60";
  try {
    const openAiResponse = await getOpenAiResponse(prompt);
    const parsed = JSON.parse(openAiResponse.choices[0].message.content);
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: "Failed to process OpenAI prompt", details: err.message });
  }
});

app.post("/regcheck", async (req, res) => {
  const { selectedCountry, searchQuery } = req.body;
  if (!selectedCountry || !searchQuery) {
    return res.status(400).json({ error: "Missing country or license plate" });
  }
  try {
    const vehicleData = await getRegcheckResponse(selectedCountry, searchQuery);
    const prompt = "This is our regcheck data, convert it to our specified JSON format: " + JSON.stringify(vehicleData);
    const openAiResponse = await getOpenAiResponse(prompt);
    const parsedResponse = JSON.parse(openAiResponse.choices[0].message.content);
    console.log("openAiResponse", JSON.stringify(parsedResponse, null, 2));
    return res.json(parsedResponse);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch vehicle data from RegCheck",
      details: error.message,
    });
  }
});

// Updated POST endpoint to handle file uploads using GPT-4
app.post('/upload', uploads.single('image'), async (req, res) => {
   //Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    console.log("image recived")
    const fileBuffer = await fs.readFile(req.file.path);
    const base64Image = fileBuffer.toString('base64');
    const typeResult = await fileTypeFromBuffer(fileBuffer);

  
const openai = new OpenAI();
const response = await openai.responses.create({
  model: "gpt-4o-mini",
  input: [
    {
      role: "system",
      content: `You are a JSON maker that. Convert our car image to data with following the exact JSON format (and nothing else): and dont add backticks and json only json with info that i want'
{
"license_plate" : (license plate),
"license_plate_country" : (country with small letters and spell the country with full form fist letter with caps),
}
Respond with valid JSON only. `,
    },
    {
      role: "user",
      content: [
          { type: "input_text", text: "here is a picture. Please identify the country code, license plate number. Respond in valid JSON format." },
          {
              type: "input_image",
              image_url: `data:${typeResult.mime};base64,${base64Image}`,
          },
    ],
}],
});


    const openAiResponse = response;
    console.log(openAiResponse);
    const parsedResponse = JSON.parse(openAiResponse.output_text);
    console.log(parsedResponse);
    return res.json({ parsedResponse });
  } catch (error) {
    console.error('Error processing file:', error);
    return res.status(500).json({ error: 'Error processing file', details: error.message });
  }
});

