const mongoose = require('mongoose'); // 몽구스 모듈 등록
module.exports = () => {
    async function connect() {
        try {
            await mongoose.connect('mongodb://localhost:27017/my_database'); // MongoDB(Local) 연결
            console.log('MongoDB has been connected successfully!');
        } catch (err) {
            console.error('Connection Error:', err);
        }
    }
    connect();
    mongoose.connection.on('disconnected', connect);    // 연결이 해제(disconnect)될 시에 다시 connect 함수를 실행
    require('./schema/user.js');
}