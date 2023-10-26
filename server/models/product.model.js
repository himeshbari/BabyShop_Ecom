import mongoose from "mongoose";
import Category from './../models/category.model.js'

const Schema = mongoose.Schema;
const Product = new mongoose.Schema({
    name: { 
        type: String,
        require:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:Category,
        require:true 
    },
    price:{
        type:Number,    
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:true
    }   
  });

export default mongoose.model('Product',Product)
