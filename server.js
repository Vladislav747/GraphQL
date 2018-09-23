//TODO:Переход на mongoose?
const mongoose = require('mongoose');
var path = require('path');
const express = require('express');
var bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql');

import ToDo from './mongoose/todo';
import schema from './graphql/Schema/Schema';
/*Constants */
const Port = 3500;
const dbName = "/users";


const app = express();



app.use('/check', (req, res) => {
    //Сервис отправляет нам ответ на запрос
    res.send("Welcome to our app");

})

//Показывать записи загруженные в БД
app.use('/graphql', graphqlHTTP (req => ({
    schema
    //,graphiql:true
   })))

app.get('/', (req, res) => {
    //Чтобы подняться выше на уровень и получить index.html
    // res.sendFile(path.join(__dirname, '../', 'index.html'));
    res.sendFile(__dirname + '/index.html');
});

app.listen(Port, (err) => {
    if (err) {
        console.log("Houston we have problem " + err);
    }
    else {
        console.log("Server running " + Port);
    }
}
);


mongoose.connect('mongodb://localhost:27017' + dbName, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', () => { console.log('---FAILED to connect to mongoose') })
db.once('open', () => {
    console.log('+++Connected to mongoose')
})


/*
Mongoose Extension
Добавляем из формы */

//TODO: Ошибка была тут не распарсили ответ 

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.post('/quotes', urlencodedParser,(req, res) => {
//    console.log(req.body.item);
// });

app.post('/quotes',urlencodedParser, (req, res) => {
    // Insert into TodoList Collection
    var todoItem = new ToDo({
        itemId: 1,
        item: req.body.item,
        completed: false
    });


    todoItem.save((err, result) => {
        if (err) { console.log("---TodoItem save failed " + err) }
        console.log("+++TodoItem saved successfully " + todoItem.item)
        res.redirect('/')
    })
}); 