const express = require('express'); // express 모듈 등록
const path = require('path');
const app =  express(); // express 객체 만들기
const basePath = path.join(__dirname, '/frontend/views');

// 'app.use' : Express에서 미들웨어를 추가하는 메서드
app.use(express.static(path.join(__dirname, 'html'))); // Express를 사용하여 정적 파일(HTML, CSS, JS 파일, 폰트 등) 서버를 설정

app.get('/',(req, res) => { // '/' 로 접속시 처리
    res.sendFile(path.join(basePath, 'main.html')); // path.join 메소드를 사용하면 디렉토리 주소 구분자가 /인지 \인지 상관없이 환경에 맞게 주소를 완성해줌
});
app.get('/about',(req, res) => { // '/about' 로 접속시 처리
    res.sendFile(path.join(basePath, 'about.html'));
});
app.listen(8080, () => {  // 8080 포트에 연결
    console.log('Express App on port 8080');
});