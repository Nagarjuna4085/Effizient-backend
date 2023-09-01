// mongodb+srv://nagarjuna:sanam@cluster0.oynhj.mongodb.net/?retryWrites=true&w=majority
import express from 'express'
import * as dotenv from "dotenv";
import nodemailer from "nodemailer"
import PDFDocument from 'pdfkit'
import fs from 'fs'
const doc = new PDFDocument();

dotenv.config();
import mongoose from 'mongoose';
import { Configuration, OpenAIApi } from "openai";
import cors from 'cors'
import sop from "./models/sop.js"
// chatgpt
const configration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
  port: 25,
  auth: {
      user: 'nagarjuna.sanem@gmail.com',
      pass: 'oloqdomyfgcrtjoj'
      
  },
  //  sendmail: true 
});
async function main(filename) {
  // send mail with defined transport object
  let mail = {
    from: "nagarjuna.sanem@gmail.com",
    to: "snagarjuna2001@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
    attachments:[
        {   // binary buffer as an attachment
            filename: filename,
            content: fs.createReadStream(filename)

        },
    ]
};
 
transporter.sendMail(mail, function (error, info) {
    if (error) {
        console.log(error);
        fs.rmSync(filename, {
            force: true,
        });
    } else {
        console.log("Email sent successfully: "
            + info.response);
            fs.rmSync(filename, {
                force: true,
            });
    }
});
}
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
    // Math.floor(Math.random() * 100000000000)
    
    const object =data.fullDocument
    console.log(data.fullDocument)
    var filename = object.fullName+'.pdf'
    doc.pipe(fs.createWriteStream(filename));

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
    doc
   
  .fontSize(27)
  .text(response.data.choices[0].text, 100, 100);
  doc.end();
  main(filename)
      
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
