import mongoose from "mongoose";

const User = mongoose.model('users', {
    next_id: String,
    next_name: String,
    next_lastname: String,
    next_email: String,
    next_password: String,
    next_customer: String,
    next_profiler: String
})

export default User