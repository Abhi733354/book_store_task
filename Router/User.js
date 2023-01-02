const express = require('express');

const router = express.Router();

// const {client} = require('../db');
// let client = db.client
// where isdeleted = $1",[false]
const db = require('../db')
router.post("/userregister", (req, res)=>{
    console.log(req.body);
    const q = "INSERT INTO users (user_name, email, password) VALUES($1, $2, $3) ";
    const values = [
        req.body.user_name,
        req.body.email,
        req.body.password
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


router.post('/userlogin', async (req, res) =>{
    console.log(req.body);
    const tempEmail = req.body.email;
    const tempPassword = req.body.password;
    try{
        const response = await db.query(`SELECT * FROM users WHERE email = '${tempEmail}' `);
        console.log("data",response.rows);
        const data = response.rows;
        if(data.length !== 0) {
            console.log(data[0].password, typeof(data[0].password), tempPassword, typeof(tempPassword));
            if(data[0].password === tempPassword) {
                res.status(201).json({message:'Succesfully login'})
            }
            else {
              
                res.status(401).json({err: 'Invalid Password'});
            }
        }
        else {
            
            res.status(401).json({err: 'Invalid Username'});
        }
    }
    catch(err) {
        res.status(400).json({Error: err.message})
    }
})


module.exports = router;