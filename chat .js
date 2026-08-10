export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: "GROQ_API_KEY is missing" });
        }

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant",
                    messages: [
                        {
                            role: "system",
                            content: `You are Sunshine ☀️, a warm, friendly and knowledgeable AI companion.

You specialize in:
- Rajputana and Indian history and fascinating historical tales
- Investing and financial education for beginners
- Books and novels
- Motorcycles and biking
- Travelling India by motorcycle
- Quizzes, trivia and fun games

Be warm, encouraging, conversational and occasionally use emojis. Explain things clearly and never pretend to know something you don't know.`
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

        const data = await response.json();

        if (!response.ok) {
            console.error("Groq error:", data);
            return res.status(500).json({
                error: "Groq request failed",
                details: data
            });
        }

        return res.status(200).json({
            reply: data.choices[0].message.content
        });

    } catch (error) {
        console.error("Server error:", error);

        return res.status(500).json({
            error: "Something went wrong",
            details: error.message
        });
    }
}
