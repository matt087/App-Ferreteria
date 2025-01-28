const mongoose = require("mongoose")

const UserSchema = mongoose.Schema(
    {
        ci: {type: String, required: true},
        name:{type: String, required: true},
        lastname:{type:String, required: true},
        email:{type:String, required:true},
        password:{type:String, required:true},
        role:{type:Number, required:true}
    },
    {
        timestamps: false
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User
