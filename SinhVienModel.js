const mongoose = require('mongoose');
const  SinhVienSchema = new mongoose.Schema({
    ten: {
        type: String,
    },
    tuoi: {
        type: Number,
    },
    diemtb: {
        type: Number,
    },
    diachi: {
        type: String,
    }
});

const SinhVienModel = new mongoose.model('sinhvien', SinhVienSchema);
module.exports = SinhVienModel;