// mongodb+srv://nagarjuna:sanam@cluster0.oynhj.mongodb.net/?retryWrites=true&w=majority
import express from 'express'
import cors from 'cors'
import MongoClientInstance from './conn.js';
const  MongoDBClient = new MongoClientInstance()
const port = process.env.PORT || 3010;
const database = MongoDBClient._client.db("Effizient");
const lor = database.collection("lor");
const app = express()
app.use(cors())
app.use(express.json())
//get Data

app.get('/hi',(req,res)=>{
  console.log(req)
  res.send({name:"nagarjuna"})

})
app.get('/getFormData', async ({req, res}) => {
  console.log(req)
  try {
    await MongoDBClient._client.connect()
    console.log("inserting")
    await lor.insertOne({
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    })
    console.log("inserted")
    return
  
  } catch (error) {
    res.status(404).json({ message: error.message })

  }

})
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}/`);
});




// Add functions that make DB calls here
