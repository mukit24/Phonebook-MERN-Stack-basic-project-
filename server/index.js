const express = require('express')
const cors = require('cors')
const app = express()

app.get('/', (req, res) => res.send('Hello world!'));
app.get('/mukit', (req, res) => res.send('Hello mukit!'));
app.use(express.json())
app.use(cors())
const PORT = 8080
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}....`)
})

const mongoose = require('mongoose')

const DB = 'mongodb+srv://mukit24:mukit_180224@cluster0.o8fvnhz.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(DB, {
    useNewUrlParser: true,
     useUnifiedTopology: true,
}).then(() =>{
    console.log('Database connected..')
})


const PhoneBook = require('./Model/phonebook')

//post req
app.post('/add-phone', async(req,res) => {
    const phoneNumber = new PhoneBook(req.body)
    try{
        await phoneNumber.save()
        res.status(201).json({
            status: 'Success',
            data : {
                phoneNumber
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

//get req
app.get('/get-phone', async (req,res) => {
    const phoneNumbers = await PhoneBook.find({})
    try{
        res.status(200).json({
            status : 'Success',
            data : {
                phoneNumbers
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})

//update req
app.patch('/update-phone/:id', async (req,res) => {
    const updatedPhone = await PhoneBook.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true
      })
    try{
        res.status(200).json({
            status : 'Success',
            data : {
              updatedPhone
            }
          })
    }catch(err){
        console.log(err)
    }
})

//delete req
app.delete('/delete-phone/:id',async (req,res) => {
    await PhoneBook.findByIdAndDelete(req.params.id)
    try{
        res.status(200).json({
            status : 'Success',
            data : {  }
          })
    }catch(err){
        console.log(err)
    }

})

