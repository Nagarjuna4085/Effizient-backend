// mongodb+srv://nagarjuna:sanam@cluster0.oynhj.mongodb.net/?retryWrites=true&w=majority
import express from 'express'
// import { MongoClient } from "mongodb";
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
//get Data

app.post('/hi',async(req,res)=>{
  console.log(req)
  

 

  res.send({name:"nagarjuna"})


})
const port = process.env.PORT || 3010;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}/`);
});




// Add functions that make DB calls here
