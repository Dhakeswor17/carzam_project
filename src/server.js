import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import OpenAI from "openai";
import { promises as fs } from 'fs';
import { existsSync, mkdirSync } from 'fs';
import { fileTypeFromBuffer } from 'file-type';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create uploads directory if it doesn't exist
if (!existsSync('uploads')) {
  mkdirSync('uploads');
}

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Use mock data flag
const USE_MOCK_DATA = true; // Set to false when ready for real API

// Updated OpenAI model
const OPENAI_MODEL = "gpt-4-turbo";

app.post("/regcheck", async (req, res) => {
  const { selectedCountry, searchQuery } = req.body;
  
  if (USE_MOCK_DATA) {
    console.log("Using mock data instead of real API");
    try {
      const mockData = {
        license_plate: searchQuery || "XYZ-789",
        vehicle_health: 7,
        safety_rating: 8,
        market_value: 22000,
        common_issues: {
          "Engine Misfire": "12%",
          "Oil Leak": "9%",
          "Battery Drain": "6%"
        },
        basic_info: {
          Carmake: "Mazda",
          Carmodel: "CX-5",
          RegistrationYear: "2020",
          BodyType: "SUV",
          FuelType: "Gasoline",
          Transmission: "Automatic"
        },
        yearly_maintenance_cost: 700
      };
      
      return res.json(mockData);
    } catch (error) {
      console.error("Mock data error:", error);
      return res.status(500).json({ error: "Failed to generate mock data" });
    }
  }

  // If not using mock data, your original API code would go here
  return res.status(501).json({ error: "Real API not implemented yet" });
});

app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const fileBuffer = await fs.readFile(req.file.path);
    const base64Image = fileBuffer.toString('base64');
    const typeResult = await fileTypeFromBuffer(fileBuffer);

    if (!typeResult) {
      throw new Error('Could not determine file type');
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: "Extract license plate information from the image and return in JSON format"
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract the license plate number and country from this image."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${typeResult.mime};base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 300
    });

    // Clean up the uploaded file
    await fs.unlink(req.file.path);

    return res.json({
      message: 'File processed successfully',
      data: response.choices[0].message.content
    });
  } catch (error) {
    console.error('Upload Error:', error);
    
    // Clean up the file if it exists
    if (req.file?.path) {
      try {
        await fs.unlink(req.file.path);
      } catch (cleanupError) {
        console.error('Cleanup Error:', cleanupError);
      }
    }

    return res.status(500).json({ 
      error: 'Error processing file',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});