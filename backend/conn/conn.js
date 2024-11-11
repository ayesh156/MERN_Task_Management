const mongoose = require('mongoose');
const conn = async () => {
    try {
        const response = await mongoose.connect("mongodb+srv://ayesh3121:ayesh3121@cluster0.jhqca.mongodb.net/TaskManagement", );
        if(response){
            console.log("connected to DB")
        }
    }catch(error){
        console.log(error)
    }
};

conn();