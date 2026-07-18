export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { herMessage, tone } = req.body || {};

  if (!herMessage || typeof herMessage !== 'string') {
    return res.status(400).json({ error: 'herMessage лозим аст' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Сервер танзим нашудааст (калид ёфт нашуд)' });
  }

  const prompt = `Ту дар зимни бозии наздик "гуфтугӯи флирт" кӯмак мерасонӣ. Шахсе паёми зерро аз шахси дӯстдоштааш гирифтааст: "${herMessage}"

Оҳанги дилхоҳ: ${tone || 'ҳазломез'}

Ду вариант ҷавоб пешниҳод кун, ки табиӣ, кӯтоҳ (1-2 ҷумла), эҳтиромона ва диққатҷалбкунанда бошанд. Ҳар ду вариант бояд ба забони тоҷикӣ бошанд ва аз ҳам фарқ кунанд (масалан як каме бештар боэътимод, дигаре мулоимтар).

Дар охири ҳар ҷавоб як смайлики мувофиқ ба оҳанг ва мазмуни ҷумла илова кун (масалан 😊, 😉, 🙂, ❤️, 😏 — вобаста ба оҳанг). Аз зиёда истифода бурдани смайлик худдорӣ кун — танҳо як смайлик дар охири ҳар ҷавоб кофист.

Ҷавобро ФАҚАТ дар формати JSON бидеҳ, бидуни ягон матни иловагӣ, чунин:
{"replies": [{"text": "...", "spark": 3}, {"text": "...", "spark": 4}]}

"spark" бояд рақами аз 1 то 5 бошад, ки дараҷаи ҷасорат/боэътимодии ҷавобро нишон медиҳад.`;

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.9 }
        })
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Gemini error:', errText);
      return res.status(502).json({ error: 'Хатогии Gemini API' });
    }

    const data = await geminiRes.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const clean = rawText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Хатогии сервер' });
  }
}
