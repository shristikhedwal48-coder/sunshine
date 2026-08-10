export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const GROQ_API_KEY = process.env.GROQ_API_KEY;

        if (!GROQ_API_KEY) {
            return res.status(500).json({
                error: "GROQ_API_KEY is not configured"
            });
        }

        const systemPrompt = `
You are Sunshine ☀️, a warm, friendly and knowledgeable AI companion.

You specialize in:
- Rajputana history, legends and historical tales
- Beginner-friendly investing and financial education
- Books, novels, characters, summaries and themes
- Motorcycles and biking
- Motorcycle travel across India
- Quizzes, trivia and games

Be conversational, encouraging and engaging.
Explain difficult ideas simply.
For financial questions, provide educational information rather than personalized financial advice.
`;

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant",
                    messages: [
                        {
                            role: "system",
                            content: systemPrompt
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 1024
                })
            }
        );

        if (!response.ok) {
            const error = await response.text();
            console.error("Groq error:", error);

            return res.status(500).json({
                error: "Groq request failed"
            });
        }

        const data = await response.json();

        const reply =
            data.choices?.[0]?.message?.content ||
            "Sorry, Sunshine couldn't find an answer.";

        return res.status(200).json({ reply });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Something went wrong"
        });
    }
}