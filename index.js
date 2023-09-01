// mongodb+srv://nagarjuna:sanam@cluster0.oynhj.mongodb.net/?retryWrites=true&w=majority
import express from 'express'
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';
import { Configuration, OpenAIApi } from "openai";
import cors from 'cors'
import sop from "./models/sop.js"
// chatgpt
const configration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configration);


const app = express()
app.use(cors())
app.use(express.json())
// mongodb+srv://nagarjuna:sanam123@cluster0.oynhj.mongodb.net/?retryWrites=true&w=majority
const dbUrl = "mongodb+srv://nagarjuna:sanam123@cluster0.oynhj.mongodb.net/Effizient1?retryWrites=true&w=majority";
 const connectionParams = {
  useNewUrlParser: true, useUnifiedTopology: true
};
await mongoose.connect(dbUrl, connectionParams)
sop.watch().
  on('change', async(data) => {
    const object =data.fullDocument
    console.log(data.fullDocument)
    // console.log(data.documentKey._id)
    // var data =sop.findById(data.documentKey._id)
    // console.log(data)
    try {
      const question =`Could you please assist me in creating a Statement of Purpose (SOP) with 5000 words? I have the following details that I'd like to include: my email is ${object.email}, full name is ${object.fullName}, age is ${object.age}, highest level of education is ${object.highestEducation},${object.graduationCollege} is the institute where I completed my highest level of education, ${object.stream} field of study,I have ${object.experience} relevant work experience, ${object.admittedUniversityName} institute I got admitted to in Canada, ${object.programName} program of study in Canada, country I'm applying from ${object.yourCountryName},${object.futureGoals} are my future goals, English language proficiency scores (${object.listeningScore}, ${object.readingScore}, ${object.speakingScore}, ${object.writingScore}), first-year tuition payment status is ${object.isTutionFeePaid}, tuition fee amount paid ${object.feePaidValue}, and whether I participated in the Guaranteed Investment Certificate (GIC) program is ${object.isGic} and paid GIC is ${object.paidGicValue}. Could you help me craft a well-structured SOP using these details?`
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        temperature: 0, // Higher values means the model will take more risks.
        max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
        top_p: 1, // alternative to sampling with temperature, called nucleus sampling
        frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
      });
    console.log(response.data.choices[0].text)
      
    } catch (error) {
      console.log("error",error)

   
    }
  });
    
   
  // });

app.post('/sendformdata',async(req,res)=>{
  const data = req.body.data
   
  // const Person = mongoose.model('lor', new mongoose.Schema({ title: String,content:String }));
  const Person = new sop(data);
  


  await Person.save()

  res.send({name:"nagarjuna",body:req.body})

})



const port = process.env.PORT || 3010;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}/`);
});




// Add functions that make DB calls here
