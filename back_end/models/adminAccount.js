import mongoose, { Schema } from "mongoose";

const adminSchema = new mongoose.Schema({

    name: {
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: () => Date.now(), required: true, immutable: true }

})

const AdminAccount = mongoose.model('AdminAccount', adminSchema)

export default AdminAccount