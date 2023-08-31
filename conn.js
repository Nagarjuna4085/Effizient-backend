import { MongoClient,ServerApiVersion } from "mongodb";
const dbUrl = "mongodb+srv://nagarjuna:sanam123@cluster0.oynhj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(dbUrl,  {
    serverApi: {
        version: ServerApiVersion.v1,
        deprecationErrors: true,
    }
})

export default class MongoDBClient {
    constructor(){
        this._client = client
    }
    
}