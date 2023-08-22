const express = require('express'); // express 모듈 등록
const router = express.Router(); // 라우터 분리
const User = require('../../schema/user.js');

/**
 * REST API Method
 * PUT : 전체수정
 * PATCH : 부분수정
 * DELETE : 삭제
 * POST : 생성요청
 * GET : 조회요청
 * 
 * PUT, PATCH, DELETE 메소드를 사용하기 위해서는 method-override 패키지 설치
 * 주소와 함께 전송되는 데이터를 받으려면 body-parser 패키지 설치
 */

router.get('/', (req, res) => { // '/' 로 접속시 처리
    res.render('main'); // pug 파일 렌더링 해주기
});

router.get('/about', (req, res) => { // '/about' 로 접속시 처리
    res.render('about');
});

// body-parser 테스트용 api
router.get('/user/:name', (req, res) => {
    res.json({ name: req.params.name });
    console.log('/user/:name 탔당!');
})
/**
 * @swagger
 * /addUser:
 *  post:
 *    summary: "유저 정보 등록"
 *    description: "POST 방식으로 유저를 등록한다."
 *    tags: [User]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 등록)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: "유저 이름"
 *              age:
 *                type: string
 *                description: "유저 나이"
 *              phone:
 *                type: string
 *                description: "유저 폰번호"
 *    responses:
 *       200:
 *         description: User added successfully
 *       500:
 *         description: Error while adding user
 */
router.post('/addUser', async (req, res) => {
    try {
        const { name, age, phone } = req.body;
        const newUser = new User({ name, age, phone });
        await newUser.save();
        res.send('User added successfully!');
    } catch (err) {
        console.error('Error while adding user:', err);
        res.status(500).send('Error while adding user');
    }
});

// 유저 정보 조회
router.get('/findUser', async (req, res) => {
    try {
        const name = req.query.findName;
        const users = await User.find({ name });
        console.log('users ::: ', users);
        // res.render('main', { user: users });
        if(users.length > 0) res.send('Found users : ' + users[0].name);
        else res.send('Not found users!');
        
    } catch (err) {
        console.error('Error while finding user:', err);
        res.render('error', { message: 'Error while finding user' });
    }
});
module.exports = router; // 모듈로 만드는 부분