const { Database } = require('./database'); // Assuming the exported class is named Database
const database = new Database();

(async () => {
  try {
    const id = await database.insert({
      userid: 1,
      name: 'john patrick amata',
      sex: 'male',
    });
    console.log(id);

    const record = await database.findById(id);
    console.log(record);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
