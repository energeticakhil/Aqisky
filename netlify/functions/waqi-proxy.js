export default async (req, res) => {
  const token = process.env.WAQI_TOKEN;
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const response = await fetch(
      `https://api.waqi.info/feed/${city}/?token=${token}`
    );

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: "API request failed" });
  }
};
