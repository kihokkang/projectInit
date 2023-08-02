const http = require('http'); // 서버를 만들기 위해 Node에 내장되어 있는 기본 모듈 호출
http.createServer((request, response) => { // 서버를 만드는 메소드
    console.log('Server Started!');
    return request
    .on('error', (err) => { // 요청에 에러가 있을때
        console.error(err);
    })
    .on('data', (data) => { // 요청에 데이터가 있을때
        console.log(data);
    })
    .on('end', () => { // 요청의 데이터가 모두 들어 왔을때
        response.on('error', (err) => { // 응답에 대한 에러가 있을때
            console.error(err);
        });
        response.statusCode = 200; // 성공 상태코드
        response.setHeader('Content-type','text/plain'); // 헤더 설정
        response.write('Hello World!'); // 바디에 정보 탑재
        response.end('the end!'); // 정보 탑재 후 브라우저로 전송
    });
}).listen(8080); // 8080 포트에 연결 (default는 80)
// 서버에 올릴때는 주로 80포트로 올리는걸 추천

/**
 * 1. request -> 서버 처리 -> response 
 * 2. request와 response 에는 header와 body로 구성
 * 3. header : request와 response에 대한 정보(종류, 크기, 캐시 여부)를 담는다
 * 4. body : 우리가 원하는 실질적인 데이터를 담는다
 * 5. statusCode에 대한 정리 필요
 */