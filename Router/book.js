const express = require('express');

const router = express.Router();

const db = require('../db')


router.post("/addbooks", (req, res)=>{
    console.log(req.body);
    const q = "INSERT INTO books (book_name, author_name, book_price, image) VALUES($1, $2, $3, $4)";
    const values = [
        req.body.book_name,
        req.body.author_name,
        req.body.price,
        req.body.image
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

router.get('/getbooks', async(req, res) => {
    try{
        
        // console.log("client", db);
        const response = await db.query('select *,b.book_price-(b.book_price*d.discount_per)/100 as discountedPrice from books b left join discount d on d.book_id = b.book_id');
        console.log(response)
        res.status(200).json(response.rows);
    }
    catch(err){
        console.log("err", err);
        res.status(422).json(err);
    }
})

router.get('/books', async(req, res) => {
    try{
        console.log("client", db);
        const response = await db.query('select * from books');
        // const response = await db.query('select *,b.book_price-(b.book_price*d.discount_per)/100 as discountedPrice from books b left join discount d on d.book_id = b.book_id');
        console.log(response)
        res.status(200).json(response.rows);
    }
    catch(err){
        console.log("err", err);
        res.status(422).json(err);
    }
})



router.get("/search/:key", async (req, res) => {
    try {
        console.log("client", db);
        const key = req.params.key;
        const response = await db.query(`SELECT * FROM books WHERE book_name = '${key}'`);
        console.log(response)
        res.status(201).json(response.rows);
    } catch(err) {
        console.log("err", err);
        res.status(422).json(err);
    }
});

router.get("/getbook/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await db.query(`SELECT * FROM books WHERE book_id = '${id}'`);
        res.status(201).json(response.rows[0]);
    } catch (err) {
        res.status(422).json(err);
    }
});

module.exports = router;