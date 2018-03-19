const express = require('express')
const app = express()
const config = require('./config')


app.get('/', (req, res) => res.send('It works!'))

app.get('/', (req, res) => res.send('It works!'))

const petType = require('./api/pet-type')

app.get('/petType/list', petType.list)
app.get('/petType/:id', petType.detail)
app.put('/petType/:id', petType.add)
app.post('/petType/:id', petType.edit)
app.delete('/petType/:id', petType.remove)

app.listen(config.port, () => console.log(`app listening on port ${config.port}!`))