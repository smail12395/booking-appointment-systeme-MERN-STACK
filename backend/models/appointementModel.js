import mongoose from "mongoose";

const appointementSchema = new mongoose.Schema({
    userId:{type:String, require:true},
    docId:{type:String, require:true},
    slotDate:{type:String, require:true},
    slotTime:{type:String, require:true},
    userData:{type:Object, require:true},
    docData:{type:Object, require:true},
    amount:{type:Number, require:true},
    date:{type:Number, require:true},
    cancelled:{type:Boolean, default:false},
    payement:{type:Boolean, default:false},
    isCompleted:{type:Boolean, default:false},
})

const appointementModel = mongoose.models.appointement || mongoose.model('appointement', appointementSchema)

export default appointementModel