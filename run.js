var Database = require('./database').Database;
var database = new Database();

var id = database.insert({
  userid: 1,
  name: 'john patrick amata',
  sex: 'male',
});
console.log(id);

var record = database.findById(id);
console.log(record);
