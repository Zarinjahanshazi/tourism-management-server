require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s8jaol5.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const touristCollection = client.db('touristDB').collection('tourist');
    const countriesCollection = client.db('touristDB').collection('countries');

    app.get('/tourist',async(req,res) =>{
        const cursor = touristCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })


    app.get('/tourist/:id',async(req,res) =>{
        const id = req.params.id;
        const query ={_id: new ObjectId(id)}
        const result = await touristCollection.findOne(query);
        res.send(result);

    })



    app.post('/tourist',async(req,res) =>{
        const addTourists = req.body;
        console.log(addTourists);
        const result = await touristCollection.insertOne(addTourists);
        res.send(result);
    })

    app.get("/countries",async(req,res) =>{
      const result = await countriesCollection.find().toArray();
      res.send(result);
    });


    app.get('/country',async(req,res) =>{
      const cursor = touristCollection.find();
      const result = await cursor.toArray();
      res.send(result);
  });

  app.get('/country/:name',async(req,res) =>{
    const name= req.params.name;
    const query = {countryName:name}
    const cursor = touristCollection.find(query);
    const result = await cursor.toArray();
    res.send(result);
});

app.get('/country/:id',async(req,res) =>{
  const id = req.params.id;
  const query ={_id: new ObjectId(id)}
  const result = await countriesCollection.findOne(query);
  res.send(result);

});





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res) =>{
    res.send('Tourism-Management  server is running')
})

app.listen(port, () => {
    console.log(`Tourism-Management server is running on port, ${port}`);
})

