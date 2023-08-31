// mongodb+srv://nagarjuna:sanam@cluster0.oynhj.mongodb.net/?retryWrites=true&w=majority
import express from 'express'
import { MongoClient,ServerApiVersion } from "mongodb";
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
//get Data

app.post('/hi',async(req,res)=>{
  const dbUrl = "mongodb+srv://nagarjuna:sanam123@cluster0.oynhj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(dbUrl,  {
  serverApi: {
      version: ServerApiVersion.v1,
      deprecationErrors: true,
  }
})
await client.connect().then(()=>{console.log("connected")})
const database = client.db("Effizient");
const lor = database.collection("lor");
  console.log(req)
  console.log("inserting")
    await lor.insertOne({
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    })
    console.log("inserted")

  res.send({name:"nagarjuna"})


})
const port = process.env.PORT || 3010;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}/`);
});




// Add functions that make DB calls here
