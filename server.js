const express = require('express'); // express 모듈 등록
const path = require('path');
const app =  express(); // express 객체 만들기
const basePath = path.join(__dirname, '/frontend/views');

// 'app.use' : Express에서 미들웨어를 추가하는 메서드
app.use(express.static(path.join(__dirname, 'html'))); // Express를 사용하여 정적 파일(HTML, CSS, JS 파일, 폰트 등) 서버를 설정

app.use((req, res, next) => {
    console.log('Hello!');
    next(); // Express.js에게 다음 미들웨어로 제어를 넘긴다는 것을 알려준다 (* 해당 함수 없으면 밑에 미들웨어나 라우팅 작동 안됨)
});

// app.[REST메소드:get,post,put,delete]('주소', 콜백함수)
// delete을 사용할려면 method-override 패키지 설치 해야함
app.get('/',(req, res) => { // '/' 로 접속시 처리
    res.sendFile(path.join(basePath, 'main.html')); // path.join 메소드를 사용하면 디렉토리 주소 구분자가 /인지 \인지 상관없이 환경에 맞게 주소를 완성해줌
});

/**
 * :id 처럼 와일드 카드 사용시 :id가 먼저 걸려서 /a 콜백함수는 실행되지 않음
 * 따라서 와일드 카드 라우터는 항상 다른 라우터들보다 뒤에 적는것이 좋다
 * Example 
 * app.get('/post/:id', () => {});
 * app.get('/post/a', () => {});
 */

app.get('/about',(req, res) => { // '/about' 로 접속시 처리
    res.sendFile(path.join(basePath, 'about.html'));
});
app.listen(8080, () => {  // 8080 포트에 연결
    console.log('Express App on port 8080');
});