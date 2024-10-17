const db = require('../db')
const { Activity } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {

  const activities = [
    {
      startTime: '2024-10-17T09:00:00',
      endTime: '2024-10-17T09:00:00',
      name: 'Check-in with Joe',
      status: 'active',
      type: 'meeting'
    }
]
    await Activity.insertMany(activities)
  
    console.log('Created initial activities!')
  }
  const run = async () => {
    await main()
    db.close()
  }
  
  run()