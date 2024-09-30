const db = require('../db')
const { Task } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {

  const tasks = [
    {
        name: 'Buy batteries',
        duration: 15,
        applyDeadline: true,
        deadlineDate: '10-04-2024',
        deadlineTime: 1439,
        ApplySchedule: false
    },  
    {
        name: 'Get reports for meeting',
        duration: 60,
        applyDeadline: false,
        deadlineDate: '',
        deadlineTime: 0,
        ApplySchedule: true
    }
]
    await Task.insertMany(tasks)
  
    console.log('Created initial tasks!')
  }
  const run = async () => {
    await main()
    db.close()
  }
  
  run()