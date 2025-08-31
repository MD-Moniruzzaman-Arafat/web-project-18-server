const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
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

    const data = [
      {
        image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac8',
        tourists_spot_name: 'Sundarbans Mangrove Forest',
        country_Name: 'Bangladesh',
        location: 'Khulna',
        short_description:
          'World’s largest mangrove forest and home of the Royal Bengal Tiger.',
        average_cost: 500,
        seasonality: 'Winter',
        travel_time: '7 days',
        totaVisitorsPerYear: 1200000,
        user_email: 'arafat@example.com',
        user_name: 'MD Moniruzzaman Arafat',
      },
      {
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        tourists_spot_name: 'Cox’s Bazar Sea Beach',
        country_Name: 'Bangladesh',
        location: 'Cox’s Bazar',
        short_description:
          'World’s longest natural sandy sea beach stretching 120 km.',
        average_cost: 350,
        seasonality: 'Winter',
        travel_time: '5 days',
        totaVisitorsPerYear: 2500000,
        user_email: 'arafat@example.com',
        user_name: 'MD Moniruzzaman Arafat',
      },
      {
        image: 'https://images.unsplash.com/photo-1562686116-e91890d2a672',
        tourists_spot_name: 'Saint Martin’s Island',
        country_Name: 'Bangladesh',
        location: 'Teknaf, Cox’s Bazar',
        short_description:
          'Only coral island of Bangladesh with crystal clear blue water.',
        average_cost: 400,
        seasonality: 'Winter',
        travel_time: '4 days',
        totaVisitorsPerYear: 700000,
        user_email: 'arafat@example.com',
        user_name: 'MD Moniruzzaman Arafat',
      },
      {
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
        tourists_spot_name: 'Rangamati Kaptai Lake',
        country_Name: 'Bangladesh',
        location: 'Rangamati',
        short_description:
          'A beautiful man-made lake surrounded by green hills and tribal culture.',
        average_cost: 300,
        seasonality: 'Summer',
        travel_time: '3 days',
        totaVisitorsPerYear: 500000,
        user_email: 'arafat@example.com',
        user_name: 'MD Moniruzzaman Arafat',
      },
      {
        image: 'https://images.unsplash.com/photo-1589810264340-8de289967e4e',
        tourists_spot_name: 'Bandarban Nilgiri Hills',
        country_Name: 'Bangladesh',
        location: 'Bandarban',
        short_description:
          'One of the highest peaks of Bangladesh with breathtaking cloud views.',
        average_cost: 600,
        seasonality: 'Winter',
        travel_time: '4 days',
        totaVisitorsPerYear: 200000,
        user_email: 'arafat@example.com',
        user_name: 'MD Moniruzzaman Arafat',
      },
      {
        image: 'https://images.unsplash.com/photo-1575980174348-5cce98adf01a',
        tourists_spot_name: 'Sajek Valley',
        country_Name: 'Bangladesh',
        location: 'Rangamati',
        short_description:
          'Known as the queen of hills, surrounded by clouds and green nature.',
        average_cost: 450,
        seasonality: 'Winter',
        travel_time: '3 days',
        totaVisitorsPerYear: 600000,
        user_email: 'arafat@example.com',
        user_name: 'MD Moniruzzaman Arafat',
      },
      {
        image: 'https://images.unsplash.com/photo-1608889175150-88f5d8f87a45',
        tourists_spot_name: 'Jaflong',
        country_Name: 'Bangladesh',
        location: 'Sylhet',
        short_description:
          'Valley of stones and waterfalls on the border of Meghalaya.',
        average_cost: 250,
        seasonality: 'Rainy',
        travel_time: '2 days',
        totaVisitorsPerYear: 400000,
        user_email: 'arafat@example.com',
        user_name: 'MD Moniruzzaman Arafat',
      },
      {
        image: 'https://images.unsplash.com/photo-1623051959126-2e01f6c7c3d8',
        tourists_spot_name: 'Ratargul Swamp Forest',
        country_Name: 'Bangladesh',
        location: 'Sylhet',
        short_description:
          'Freshwater swamp forest, also called the Amazon of Bangladesh.',
        average_cost: 200,
        seasonality: 'Rainy',
        travel_time: '2 days',
        totaVisitorsPerYear: 150000,
        user_email: 'arafat@example.com',
        user_name: 'MD Moniruzzaman Arafat',
      },
      {
        image: 'https://images.unsplash.com/photo-1565613130944-5b8b4a6552da',
        tourists_spot_name: 'Kuakata Sea Beach',
        country_Name: 'Bangladesh',
        location: 'Patuakhali',
        short_description:
          'Known as the daughter of sea, famous for both sunrise and sunset.',
        average_cost: 320,
        seasonality: 'Winter',
        travel_time: '5 days',
        totaVisitorsPerYear: 800000,
        user_email: 'arafat@example.com',
        user_name: 'MD Moniruzzaman Arafat',
      },
      {
        image: 'https://images.unsplash.com/photo-1616593795667-7c91acacc4fd',
        tourists_spot_name: 'Srimangal Tea Gardens',
        country_Name: 'Bangladesh',
        location: 'Moulvibazar',
        short_description:
          'The land of two leaves and a bud, famous for tea gardens and green hills.',
        average_cost: 280,
        seasonality: 'Summer',
        travel_time: '3 days',
        totaVisitorsPerYear: 300000,
        user_email: 'arafat@example.com',
        user_name: 'MD Moniruzzaman Arafat',
      },
    ]

    // // insert many
    // app.post('/TouristsSpot', async (req, res) => {
    //   // const newSpots = req.body
    //   const result = await spotsCollection.insertMany(data)
    //   res.status(201).json(result)
    // })

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
