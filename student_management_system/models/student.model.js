const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
   fullName: {
       type: 'string',
       required: 'This field is required'
   },

   rollno: {
       type: 'string'
   },

   email:{
       type: 'string'
   },
   
   mobile: {
       type: 'string'
   },

    city:{
       type:'String'
   }


})


studentSchema.path('email').validate((val)=> {
    emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(val)
}, 'Invalid Email.')

mongoose.model('Student', studentSchema)