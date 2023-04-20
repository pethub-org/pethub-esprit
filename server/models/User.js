const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username : {
        type :String,
        required : true,
        min: 4,
        max:20,
        unique: true
    },
    email : {
        type : String,
        required : true,
        max:50,
        unique:true
    },
    password: {
        type : String,
        required : true,
        min : 8,
        
    },
    profilePicture:{
        type : String,
        default:""
    },
    coverPicture:{
        type : String,
        default:""
    },
    followers : {
        type :Array,
        default:[]
    },
    followersPeople : {
        type :Array,
        default:[]
    },
    isAdmin:{
        type : Boolean,
        default:false
    },
    descrption : {
        type: String,
        max:50
    },
    city : {
        type: String,
        max:50
    },
    from : {
        type : String,
        max:50
    },
    relationShip : {
        type:Number,
        enum : [1,2,3]
    }
},{timestamps:true})
module.exports = mongoose.model("users",userSchema)