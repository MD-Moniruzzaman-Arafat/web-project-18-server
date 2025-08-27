const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://arafatmonir091:${process.env.DB_PASSWORD}@cluster0.dli62xc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()

    const database = client.db('Tourism')
    const countrys = database.collection('countrys')
    const spotsCollection = database.collection('spots')

    // Create a new tourist spot
    app.post('/TouristsSpot', async (req, res) => {
      const newSpot = req.body
      const result = await spotsCollection.insertOne(newSpot)
      res.status(201).json(result)
    })

    // Get all countries
    app.get('/countrys', async (req, res) => {
      const allCountrys = await countrys.find().toArray()
      res.json(allCountrys)
    })

    // Get all tourist spots
    app.get('/TouristsSpot', async (req, res) => {
      const spots = await spotsCollection.find().toArray()
      res.json(spots)
    })

    // Get a single tourist spot by ID
    app.get('/TouristsSpot/:id', async (req, res) => {
      const id = req.params.id
      const spot = await spotsCollection.findOne({ _id: new ObjectId(id) })
      if (spot) {
        res.json(spot)
      } else {
        res.status(404).json({ message: 'Spot not found' })
      }
    })

    // Delete a tourist spot by ID
    app.delete('/TouristsSpot/:id', async (req, res) => {
      const id = req.params.id
      const result = await spotsCollection.deleteOne({ _id: new ObjectId(id) })
      if (result.deletedCount > 0) {
        res.json({ message: 'Spot deleted successfully' })
      } else {
        res.status(404).json({ message: 'Spot not found' })
      }
    })

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close()
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
