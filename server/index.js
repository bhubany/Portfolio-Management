const express =require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql =require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'portfoliomgmt',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// add stock name to DB
app.post('/api/insertStockSymbol', (req, res) => {
    const addStockName = req.body.addStockName;
    const addStockSymbol = req.body.addStockSymbol;

    const sqlInsert ="INSERT INTO stock_symbols (stockName, stockSymbol) VALUES(?,?)";
    db.query(sqlInsert, [addStockName, addStockSymbol], (err, result) =>{
        console.log(err);
    })
})

// Insrt stock into DB
app.post('/api/insert', (req, res) => {
    const stockName = req.body.stockName;
    const transcType = req.body.transcType;
    const quantity = req.body.quantity;
    const amount = req.body.amount;
    const transcDate = req.body.transcDate;



    const sqlInsert ="INSERT INTO stock_details (stockName, transcType, quantity, amount, transacDate) VALUES(?,?,?,?,?)";
    db.query(sqlInsert, [stockName, transcType, quantity, amount, transcDate], (err, result) =>{
        console.log(err);
    })
})


// fetch stockName from DB
app.get('/api/getAllStockNames', (req,res) => {
    const sqlGetAll ="SELECT * FROM stock_symbols";
    db.query(sqlGetAll, (err, result)=>{
        res.send(result);
    })
})

// fetch from db
app.get('/api/getAll', (req,res) => {
    const sqlGetAll ="SELECT * FROM stock_details";
    db.query(sqlGetAll, (err, result)=>{
        res.send(result);
    })
})

app.listen(3001, () =>{
    console.log("running on port 3001");
})