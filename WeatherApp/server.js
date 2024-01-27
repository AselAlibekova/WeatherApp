const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    
});



app.get('/weatherCity', async (req, res) => {
    try {
        // Fetch weather data from OpenWeatherMap API based on city name
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${req.query.city}&appid=d4ab25597ace0a534ab951a3bbcaf941`);
        res.json({
            data: result.data
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

