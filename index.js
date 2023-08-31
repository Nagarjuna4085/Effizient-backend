// mongodb+srv://nagarjuna:sanam@cluster0.oynhj.mongodb.net/?retryWrites=true&w=majority
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import sop from "./models/sop.js"
const app = express()
app.use(cors())
app.use(express.json())
// mongodb+srv://nagarjuna:sanam123@cluster0.oynhj.mongodb.net/?retryWrites=true&w=majority
const dbUrl = "mongodb+srv://nagarjuna:sanam123@cluster0.oynhj.mongodb.net/Effizient?retryWrites=true&w=majority";
 const connectionParams = {
  useNewUrlParser: true, useUnifiedTopology: true
};

app.get('/hi',async({res})=>{
  await mongoose.connect(dbUrl, connectionParams) 
  // const Person = mongoose.model('lor', new mongoose.Schema({ title: String,content:String }));
  const Person = new sop({
    title:"title",content:"content"
  });
  sop.watch().
  on('change', data => console.log(data));


  await Person.save()

  res.send({name:"nagarjuna"})

})



const port = process.env.PORT || 3010;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}/`);
});




// Add functions that make DB calls here
