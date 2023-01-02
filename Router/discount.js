const express = require('express');

const router = express.Router();
const db = require('../db');


router.post("/discount", (req, res)=>{
    console.log(req.body);
    const q = 'INSERT INTO discount (discount_per, book_id) VALUES($1,$2)'
    const values = [
        req.body.discount_per,
        req.body.book_id
    ];
    
    db.query(q, values, (err, data)=>{
        if(err){
            console.log("err", err);
            res.send(err);
            
        }else{
            res.send(data);
        }
    })
})

module.exports = router;