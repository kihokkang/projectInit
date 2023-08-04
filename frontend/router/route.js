const express = require('express'); // express 모듈 등록
const router = express.Router(); // 라우터 분리

router.get('/',(req, res) => { // '/' 로 접속시 처리
    res.render('main'); // pug 파일 렌더링 해주기
});

router.get('/about',(req, res) => { // '/about' 로 접속시 처리
    res.render('about');
});
module.exports = router; // 모듈로 만드는 부분