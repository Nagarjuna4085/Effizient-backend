// mongodb+srv://nagarjuna:sanam@cluster0.oynhj.mongodb.net/?retryWrites=true&w=majority
import express from 'express'
import cors from 'cors'
import { MongoClient,ServerApiVersion } from "mongodb";
const dbUrl = "mongodb+srv://nagarjuna:sanam123@cluster0.oynhj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(dbUrl,  {
  serverApi: {
      version: ServerApiVersion.v1,
      deprecationErrors: true,
  }
})
await client.connect().then(()=>{console.log("connected")})
const port = process.env.PORT || 3010;
const database = client.db("Effizient");
const lor = database.collection("lor");
const app = express()
app.use(cors())
app.use(express.json())
//get Data

app.get('/hi',async(req,res)=>{
  console.log(req)
  console.log("inserting")
    await lor.insertOne({
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    })
    console.log("inserted")

  res.send({name:"nagarjuna"})


})
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}/`);
});




// Add functions that make DB calls here
