// require('dotenv').config()

const express = require('express')
// const router = express.Router(); //check if needed

const logger = require('morgan')
const bodyParser = require('body-parser')
const db = require('./db/index')
const cors = require('cors')

//initial declaration of constants for controllers
const { Task, Activity} = require('./models')
const taskController = require('./controllers/taskController')
const activityController = require('./controllers/activityController')
const scheduleController = require('./controllers/scheduleController');

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

//Routes for Tasks
app.get('/task', taskController.getAllTasks)
app.get('/task/:id', taskController.getTaskById)
app.post('/task', taskController.createTask)
app.put('/task/:id', taskController.updateTask)
app.delete('/task/:id', taskController.deleteTask)

//Routes for Activities
app.get('/activity', activityController.getAllActivities)
app.get('/activity/:id', activityController.getActivityById)
app.post('/activity', activityController.createActivity)
app.put('/activity/:id', activityController.updateActivity)
app.delete('/activity/:id', activityController.deleteActivity)

//Routes for Schedule
app.get('/schedules', scheduleController.getAllSchedules);
app.get('/schedules/:id', scheduleController.getScheduleById);
app.get('/schedules/date/:date', scheduleController.getSchedulesByDate);
app.post('/schedules', scheduleController.createSchedule);
app.put('/schedules/:id', scheduleController.updateSchedule);
app.delete('/schedules/:id', scheduleController.deleteSchedule);
app.get('/available-slots', scheduleController.getAvailableSlots);

//catch error routes
app.get('*', (req, res) => {
	res.send('404 Not Found')
})
