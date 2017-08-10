const express = require('express')
const {json} = require('body-parser')
const massive = require('massive')
const cors = require('cors');
const port = 3000
const config = require('./config')
const products_controller = require('./products_controller')

const app = module.exports = express()

app.use(json() )
app.use(cors() )

massive(config.massiveConnectionString).then( dbInstance =>

  app.set("db", dbInstance)
)

app.post('/api/product', products_controller.create)
app.get('/api/products', products_controller.getAll)
app.get('/api/product/:id', products_controller.getOne)
app.put('/api/product/:id', products_controller.update)
app.delete('/api/product/:id', products_controller.delete)

app.listen(port, ()=> {
  console.log(`Hey dude, I'm listening on port ${port}`)
})
