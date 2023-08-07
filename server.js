const express = require('express'); // express 모듈 등록
const path = require('path');
const app =  express(); // express 객체 만들기
const route = require('./frontend/router/route.js'); // route.js에서 module.exports로 export했던 router을 연결함
const basePath = path.join(__dirname, '/frontend/views');
const database = require('./db.js');

app.set('view engine', 'pug'); // view 엔진을 pug로 설정하기
app.set('views', path.join(basePath)); // pug 파일들이 있는 폴더를 설정하는 부분
database(); // 데이터 베이스 실행
// 'app.use' : Express에서 미들웨어를 추가하는 메서드
app.use(express.static(path.join(basePath))); // Express를 사용하여 정적 파일(HTML, CSS, JS 파일, 폰트 등) 서버를 설정

// 요청 본문 파싱을 위한 미들웨어 추가
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log('Hello!');
    next(); // Express.js에게 다음 미들웨어로 제어를 넘긴다는 것을 알려준다 (* 해당 함수 없으면 밑에 미들웨어나 라우팅 작동 안됨)
});

/**
 * app.use로 라우팅을 하는 것의 장점은, 그룹화가 쉬움
 * app.use('/category', route1); 이런 코드가 있으면 route1에 있는 라우터들은 모두 category 주소 아래에 그룹화됨
 * route1에 router.get('/javascript', 콜백)라는 코드가 있다면, 자동으로 '/category/javascript' 주소로 연결
 */
app.use('/', route);
app.use((req, res, next) => {
    res.status(404).send('일치하는 주소가 없습니다.');
}); 

/**
 * next(err)로 넘겨줬던 에러가 최종적으로 도착하는 부분
 * next(err)가 호출되는 순간 다른 app.use는 모두 건너뛰고, 바로 err 매개변수가 있는 해당 함수로 넘어옴
 * 이 부분이 없으면 처리할 부분이 없어서 서버가 죽는다.
 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('서버 에러');
});

app.listen(8080, () => {  // 8080 포트에 연결
    console.log('Express App on port 8080');
});