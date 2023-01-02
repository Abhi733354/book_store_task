const express = require('express');

const router = express.Router();

const db = require('../db');
router.post("/order", (req, res)=>{
    console.log(req.body);
    const q = "INSERT INTO orders (book_name, book_price, user_name, address) VALUES($1, $2, $3, $4)";
    const values = [
        req.body.book_name,
        req.body.book_price,
        req.body.user_name,
        req.body.address
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

router.get('/getorders', async(req, res) => {
    try{
        console.log("client", db);
        const response = await db.query('select * from orders ;');
        console.log(response)
        res.status(200).json(response.rows[0]);
    }
    catch(err){
        console.log("err", err);
        res.status(422).json(err);
    }
})

module.exports = router;