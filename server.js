const http = require('http'); // 서버를 만들기 위해 Node에 내장되어 있는 기본 모듈 호출
const url = require('url');
const fs = require('fs');

http.createServer((request, response) => { // 서버를 만드는 메소드
    const path = url.parse(request.url, true).pathname; // url에서 path 추출
    if(request.method == 'GET') { // GET 요청일때
        if(path === '/about') { // 주소가 '/about' 일때
            response.writeHead(200, {'Content-type':'text/html'}); // 헤더 설정
            // __dirname는 현재 프로젝트의 경로
            fs.readFile(__dirname + '/frontend/views/about.html', (err, data) => { // 파일 읽는 메소드
                if(err) return console.error(err); // 에러 발생시 에러 기록하고 리턴
                response.end(data,'utf-8'); // 브라우저로 전송
            });
        }else if(path === '/'){
            response.writeHead(200, {'Content-type':'text/html'});
            fs.readFile(__dirname + '/frontend/views/main.html', (err, data) => {
                if(err) return console.error(err);
                response.end(data,'utf-8');
            });
        }else {
            response.statusCode = 404; // 404 상태코드
            response.end('404 !!!');
        }
    }
}).listen(8080); // 8080 포트에 연결 (default는 80)
// 서버에 올릴때는 주로 80포트로 올리는걸 추천

/**
 * 1. request -> 서버 처리 -> response 
 * 2. request와 response 에는 header와 body로 구성
 * 3. header : request와 response에 대한 정보(종류, 크기, 캐시 여부)를 담는다
 * 4. body : 우리가 원하는 실질적인 데이터를 담는다
 * 5. statusCode에 대한 정리 필요
 */