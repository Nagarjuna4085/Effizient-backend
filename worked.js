// mongodb+srv://nagarjuna:sanam@cluster0.oynhj.mongodb.net/?retryWrites=true&w=majority
import { MongoClient,ServerApiVersion } from "mongodb";

const dbUrl = "mongodb+srv://nagarjuna:sanam123@cluster0.oynhj.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(dbUrl,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

async function Connect(){
  await client.connect().then(()=>{console.log("connected")})
}
const database = client.db("Effizient");
const lor = database.collection("lor");
let changeStream= lor.watch();
function eventListner(){
// set up a listener when change events are emitted
changeStream.on("change", next => {
  // process any change event
  console.log("received a change to the collection: \t", next);
});
}
Connect()
eventListner()
async function run() {
try {  
    console.log("inserting")
    await lor.insertOne({
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    });
 

} catch(err) {
console.log(err)}
}
run().catch(console.dir);


// Add functions that make DB calls here
