const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const API_DOMAIN = 'https://phimapi.com';
// const PLAYER_DOMAIN = 'https://player.phimapi.com';

app.get("/", async (req, res) => {
    res.status(200).json({message: "Welcome to the Movie API"});
});

app.get("/api/movies/new", async(req, res) => {
    const page = req.query.page || 1;
    try {
        const response = await axios.get(`${API_DOMAIN}/danh-sach/phim-moi-cap-nhat?page=${page}`);
        // console.log("page: ", page);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({message: 'Error fetching new movies', error: error.message});
    }
});

app.get("/api/movies/slug/:slug", async(req, res) =>{
    const slug = req.params.slug;
    try {
        const response = await axios.get(`${API_DOMAIN}/phim/${slug}`);
        const movieData = response.data;
        // console.log("Movie data: ", movieData);
        res.json(movieData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movie details" });
    }
});

app.get("/api/categories", async(req, res) =>{
    try {
        const response = await axios.get(`${API_DOMAIN}/the-loai`);
        const categories = response.data;
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies categories" });
    }
});

app.get("/api/country", async(req, res) =>{
    try {
        const response = await axios.get(`${API_DOMAIN}/quoc-gia`);
        const country = response.data;
        res.json(country);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies country" });
    }
});

app.get("/api/movies/search", async (req, res) => {
    try {
        const keyword = req.query.keyword; 
        const queryParams = req.query; 

        if (!keyword) {
            return res.status(400).json({ message: "keyword is required" });
        }
        
        const response = await axios.get(`${API_DOMAIN}/v1/api/tim-kiem`, {
            params: queryParams
        });
        
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching filtered movies", error: error.message }); 
    }
});

app.get("/api/movies/:type_list", async (req, res) => {
    try {
        const type_list = req.params.type_list;
        const queryParams = req.query;

        if (!type_list) {
            return res.status(400).json({ message: "type_list is required" });
        }
        const response = await axios.get(`${API_DOMAIN}/v1/api/danh-sach/${type_list}`, {
            params: queryParams
        });
        // console.log("Query Params: ", queryParams);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching filtered movies", error: error.message }); 
    }
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});