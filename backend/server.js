const express = require('express');
const dotenv = require('dotenv').config({path:'../.env'});
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const apiKey = process.env.API_KEY;

app.use(express.json());
app.use(cors());
app.post('/locations', async (req, res) =>{
    console.log(req.body);
    const {query} = req.body;
    try{
        console.log(query);
        const googleResponse = await fetch('https://places.googleapis.com/v1/places:searchText',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "X-Goog-Api-Key":apiKey,
                "X-Goog-FieldMask":"places.displayName,places.formattedAddress,places.priceLevel" 
            },
            body: JSON.stringify({
                "textQuery": query,
                pageSize: 5,      
            })
        });
        const googleData = await googleResponse.json();
        console.log(googleData);
        if (googleData.error){
            res.status(500).json({
                status:'error',
                code:500,
                message:'server error',
            })
            
        }
        else{
            res.status(200).json({
                status:'success',
                code:200,
                data:{
                    locations: googleData.places,
                }
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:'error',
            code:500,
            message:'server error',
        })
    }
});

app.listen(port, ()=>{
    console.log(`Server running on Port ${port}`);
})
