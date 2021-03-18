const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Student = mongoose.model('Student')

router.get('/', (req,res) => {
    res.render('student/addOrEdit',{
        viewTitle : "Insert Student"
    })
})

router.post('/', (req,res) => {
    insertRecord(req,res)
})

function insertRecord(req,res){
    var student = new Student()
    student.fullName = req.body.fullName
    student.email = req.body.email
    student.rollno = req.body.rollno
    student.mobile = req.body.mobile
    student.city = req.body.city
    student.save((err,doc)=> {
        if(!err)
            res.redirect('student/list')
        else{
            if(err.name == 'ValidationError') {
                    handleValidationError(err,req.body)
                    res.render('student/addOrEdit',{
                        viewTitle : "Insert Student",
                        student: req.body
                    })
            }
            else
                console.log('Error during insertion: '+err)
        }
    })
}

router.get('/list', (req,res) => {
    Student.find((err,docs) => {
        if(!err){
            res.render('student/list', {
                list: docs
            })
        }
        else{
            console.log('Error in retrieving data: ', +err)
        }
    })
})

function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch(err.errors[field].path){
            case 'fullName': 
                body['fullNameError'] = err.errors[field].message
                break
            case 'email': 
                body['emailError'] = err.errors[field].message
                break
            default:
                break
        }
    }
}

module.exports = router