// mongodb+srv://nagarjuna:sanam@cluster0.oynhj.mongodb.net/?retryWrites=true&w=majority
import express from 'express'
import cors from 'cors'
import MongoClientInstance from './conn.js';
const  MongoDBClient = new MongoClientInstance()
const port = process.env.PORT || 3010;
const app = express()
app.use(cors())
app.use(express.json())

const database = MongoDBClient._client.db("Effizient");
const lor = database.collection("lor");
let changeStream= lor.watch();
function eventListner(){
// set up a listener when change events are emitted
changeStream.on("change", next => {
  // process any change event
  console.log("received a change to the collection: \t", next);
});
}
eventListner()
//get Data
app.get('/getFormData', async (req, res) => {
  console.log(req)
  try {
    console.log("inserting")
    await lor.insertOne({
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    });
    
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ message: error.message })

  }

})
MongoDBClient._client.connect().then(() => app.listen(port,'0.0.0.0' ,() => console.log(`Server Running on Port: http://localhost:${port}`)))
.catch((error) => console.log(`${error} did not connect`));





// Add functions that make DB calls here
