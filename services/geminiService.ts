import { GoogleGenAI, Type, Schema } from "@google/genai";
import { NLQResponse } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Schema definition for the NLQ response to ensure structured data
const nlqResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    answer: {
      type: Type.STRING,
      description: "A natural language summary of the answer.",
    },
    visualizationType: {
      type: Type.STRING,
      enum: ["bar", "line", "pie", "table", "none"],
      description: "Recommended visualization for the data.",
    },
    data: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          value: { type: Type.NUMBER },
          category: { type: Type.STRING, nullable: true }
        }
      },
      description: "Structured data points extracted or simulated for the query.",
    },
    sqlGenerated: {
      type: Type.STRING,
      description: "The SQL query that would hypothetically be run on BigQuery.",
    }
  },
  required: ["answer", "visualizationType", "sqlGenerated"]
};

/**
 * Simulates a prediction model for stock forecasting.
 * In a real scenario, this would call a Vertex AI Endpoint trained with Prophet.
 * Here we use Gemini to generate plausible synthetic data for the demo.
 */
export const generateStockForecast = async (itemName: string): Promise<any[]> => {
  if (!apiKey) return [];

  const model = "gemini-2.5-flash";
  const prompt = `
    Generate a JSON array of daily stock usage data for a hospital pharmaceutical item: "${itemName}".
    The data should cover the last 30 days (actual) and the next 30 days (predicted).
    
    Format:
    [
      { "date": "YYYY-MM-DD", "actual": 120, "predicted": 120, "lowerBound": 110, "upperBound": 130 },
      ...
    ]
    
    For future dates, set "actual" to null.
    Include some seasonality or trend.
    Return ONLY the JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (text) {
        return JSON.parse(text);
    }
    return [];
  } catch (error) {
    console.error("Error generating forecast:", error);
    return [];
  }
};

/**
 * Natural Language Query processing.
 * Converts user question into structured data/insight using RAG/Context simulation.
 */
export const processNaturalLanguageQuery = async (query: string): Promise<NLQResponse | null> => {
  if (!apiKey) {
    console.warn("API Key missing");
    return null;
  }

  const model = "gemini-2.5-flash";
  const systemInstruction = `
    You are an expert ERP Data Analyst for a Hospital System (RSE-ERP).
    You have access to schemas for:
    1. Inventory (Stock levels, expiry, movement)
    2. Finance (Billing, Claims, GL)
    3. Patient Services (Admissions, Procedures)

    Translate the user's natural language question into a structured JSON response.
    Simulate realistic data for the answer if you don't have real database access.
    
    Context:
    - Currency: IDR
    - Hospital Name: Grand Central Hospital
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: query,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: nlqResponseSchema,
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as NLQResponse;
    }
    return null;

  } catch (error) {
    console.error("Error processing NLQ:", error);
    throw error;
  }
};