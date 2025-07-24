const OpenAI = require("openai");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generarEjercicio(req, res) {
  const { texto: prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Falta el prompt" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // o el modelo que prefieras
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });

    const respuesta = completion.choices[0].message.content;
    res.json({ resultado: respuesta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando ejercicio" });
  }
}

module.exports = { generarEjercicio };

