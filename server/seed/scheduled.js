const db = require('../db')
const { Schedule } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {

    const scheduled = [
        {
            task: '66fa1d4d9c2224b7f19cab72',
            startDate: '12-31-2024',
            startTime: 600,
            endTime: 610,
            status: 'scheduled',
            recurrence: {
                enabled: false,
                pattern:'none',
                daysOfWeek: 0,
                endDate: '12-31-2024',
            },
            lastOccurrence: '12-31-2024',
            nextOccurrence: '12-31-2024'
    }

    ]
    await Schedule.insertMany(scheduled)
  
    console.log('Created initial schedule!')
  }
  const run = async () => {
    await main()
    db.close()
  }
  
  run()