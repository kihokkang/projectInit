const express = require('express'); // express 모듈 등록
const router = express.Router(); // 라우터 분리
const User = require('../../schema/user.js');

router.get('/', (req, res) => { // '/' 로 접속시 처리
    res.render('main'); // pug 파일 렌더링 해주기
});

router.get('/about', (req, res) => { // '/about' 로 접속시 처리
    res.render('about');
});

// 유저 정보 등록
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
        const name = req.query.findName; // URL 쿼리로부터 사용자 이름 가져오기
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