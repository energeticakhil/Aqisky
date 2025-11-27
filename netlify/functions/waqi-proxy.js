exports.handler = async (event, context) => {
  try {
    const token = process.env.WAQI_TOKEN;
    const city = event.queryStringParameters.city;

    if (!city) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "City missing" })
      };
    }

    const response = await fetch(
      `https://api.waqi.info/feed/${city}/?token=${token}`
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", details: err.message })
    };
  }
};
