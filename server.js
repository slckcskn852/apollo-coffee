//SELCUK COSKUN 041801079
const client = require('./connection.js')
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');

app.listen(3300, ()=>{
    console.log("Server is now listening at port 3300");
})

client.connect();

const corsOptions = {
    origin: '*'
};


const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "041801079")));




app.options('/Customer', cors(corsOptions));
app.options('*', cors(corsOptions));
app.post('/Customer', cors(corsOptions), (req, res)=> {
    let CustomerID = Math.floor(Math.random() * 10000) + 1;
    const user = req.body;
    let insertQuery = `INSERT INTO public."Customer"
                       values(${CustomerID}, '${user.firstname}', '${user.lastname}', '${user.address}', '${user.town}', '${user.postcode}', '${user.email}')`
   

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})


app.post('/Login', cors(corsOptions), (req, res)=> {
    const user = req.body.email
    let insertQuery = `SELECT * FROM public."Customer" WHERE "EmailAddress" LIKE '${user}';`
    client.query(insertQuery, (err, result)=>{
        console.log(result.rows[0])
        if(!err){
            res.send(result.rows[0])
        }
        else{ console.log(err.message) }
    })
    client.end;

})

app.get('/Coffee',cors(corsOptions), (req, res)=> {
    let insertQuery = `SELECT "Coffee"."CoffeeID", "Coffee"."Name", "Coffee"."Description", "Size"."Type", "Size"."Cost" FROM "Coffee", "Size" WHERE "Coffee"."CoffeeID" = "Size"."CoffeeID"`
    client.query(insertQuery, (err, result)=>{
        console.log(result.rows)
        if(!err){
            
            res.send(result.rows)
        }
        else{ console.log(err.message) }
    })
    client.end;

})

app.post('/Coffee', cors(corsOptions), (req, res)=> {
    let CoffeeID = Math.floor(Math.random() * 10000) + 1;
    const coffee = req.body;
    let insertQuery = `INSERT INTO public."Coffee"
                       values(${CoffeeID}, '${coffee.name}', '${coffee.description}')`
    

    client.query(insertQuery, (err, result)=>{
        if(!err){
            let insertQuery2 = `INSERT INTO public."Size"
                                values(${CoffeeID}, '${coffee.size}', '${coffee.price}')`
                                client.query(insertQuery2, (err, result)=>{

                                                                })
                                client.end;
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.post('/Order', cors(corsOptions), (req, res)=> {
    let OrderID = Math.floor(Math.random() * 10000) + 1;
    let OrderItemID = Math.floor(Math.random() * 10000) + 1;
    const user = req.body;
    let insertQuery = `INSERT INTO public."CustomerOrder"
                       values(${OrderID},'${new Date().toISOString()}',${user.customerID},'${user.time}' )`
                       let insertQuery2 = `INSERT INTO public."OrderItem"
                       values(${OrderItemID},${OrderID},${user.coffeeID},'${user.type}',${user.quantity} )`
                       
                    console.log(insertQuery)
                   console.log(insertQuery2)
    client.query(insertQuery, (err, result)=>{
        if(err)console.log(err.message)
        client.query(insertQuery2, (err, result)=>{
            if(err)console.log(err.message)
            res.send({})  
        })
    })
    
    client.end;
})


app.get('/Order',cors(corsOptions), (req, res)=> {
    let insertQuery = `SELECT "CustomerOrder"."OrderID", "CustomerOrder"."Date", "CustomerOrder"."DeliveryTime", "CustomerOrder"."CustomerID", "OrderItem"."OrderItemID", "OrderItem"."OrderID", "OrderItem"."CoffeeID", "OrderItem"."Type", "OrderItem"."Quantity" FROM "CustomerOrder", "OrderItem" WHERE "CustomerOrder"."OrderID" = "OrderItem"."OrderID"`
    client.query(insertQuery, (err, result)=>{
        console.log(result.rows)
        if(!err){
            
            res.send(result.rows)
        }
        else{  }
    })
    client.end;

})