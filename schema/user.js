const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({    // 테이블의 구조
    name: String,
    age: String,
    phone: String
});
module.exports = mongoose.model('User', userSchema); // User 라는 모델명으로 해당 스키마 사용등록