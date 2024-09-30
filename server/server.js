// require('dotenv').config()

const express = require('express')

const logger = require('morgan')
const bodyParser = require('body-parser')
const db = require('./db/index')
const cors = require('cors')

//initial declaration of constants for controllers
const { Task} = require('./models')
const taskController = require('./controllers/taskController')

// require() imports and middleware here ^ ///////

const PORT = process.env.PORT || 3001
const app = express()
//
app.use(cors())
app.use(express.json())
//morgan
app.use(logger('dev'))
app.use(bodyParser.json())
// app.use() middleware here ^ ///////////////////
db.on('error', console.error.bind(console, 'MongoDB Atlas connection error:'))

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
app.get('/', (req, res) => res.send('This is the landing page!'))

//Routes for ContactMsg
app.get('/task', taskController.getAllTasks)
app.get('/task/:id', taskController.getTaskById)
app.post('/task', taskController.createTask)
app.put('/task/:id', taskController.updateTask)
app.delete('/task/:id', taskController.deleteTask)

//catch error routes
app.get('*', (req, res) => {
	res.send('404 Not Found')
})
