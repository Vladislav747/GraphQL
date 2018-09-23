
const mongoose = require('mongoose');
//GraphQL Создаем Схему данных для фронтенда

var Schema = mongoose.Schema;
//Название коллекции 
var CollectionName = "TodoList";

//TODO:Создаем коллекцию ToDoList!!!
// creating a schema

var toDoSchema = new Schema({
    itemId: Number,
    item: String,
    completed: Boolean
}, {collection:CollectionName});



// we need to create a model using it
var ToDo = mongoose.model('ToDo', toDoSchema);
export default ToDo;