const fs = require('fs')
const express = require('express')

const app = express()

app.use(express.json())

// app.get('/', (req, res) => {
//     res.status(200).json({message:'Hello form the server side!', app: 'NBM'})
// })
//
// app.post('/', (req, res) =>{
//     res.send('You can post to this endpoint...')
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    })
})

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params)
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours: tours
    // }
  })
})

app.post('/api/v1/tours', (req,res) => {
   // console.log(req.body)

  const newID = tours[tours.length - 1].id + 1
  const newTour = Object.assign({id: newID}, req.body)

  tours.push(newTour)
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  })
})

const port = 4123
app.listen(port, () => {
    console.log(`App is running on port ${port}...`)
})

