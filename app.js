const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser')
const dotenv = require("dotenv")
const db = require('./db')

dotenv.config()
app.use(cors());
app.use(express.json())
// app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// app.use(express.urlencoded({
//     extended:false
// }));

const port = 8003;
// app.set('port', process.env.PORT || 4000);


app.get("/", (req,res)=>{
    res.json("server running")
})

const users = require('./Router/User');
app.use(users);
const books = require('./Router/book');
app.use(books);
const orders = require('./Router/order');
app.use(orders);
const discounts = require('./Router/discount');
app.use(discounts);

 var x = app.listen(port, () => {
    console.log(`server start ${port}`);
})
