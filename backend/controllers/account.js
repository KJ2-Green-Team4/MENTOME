const User = require('../models/user');

// Sign Up 
exports.signUp = (req, res) => {
    let newUser = req.body;
    newUser.profilePicture = 'https://w7.pngwing.com/pngs/691/765/png-transparent-primary-profile-illustration-computer-icons-person-anonymous-miscellaneous-silhouette-black-thumbnail.png';
    newUser.stars = 4.5;
    newUser.mentoringCount = 0;
    newUser.notice = [];
    const user = new User(newUser);
    User.findOne({ userId: user.userId })
        .then(dupUser => {
            if (!dupUser) {
                user.save()
                    .then(user => {
                        res.json({ 
                            signUpSuccess: true,
                            message: "회원가입 성공"
                        });
                        console.log('Sign Up Success!');
                    });
            } else {
                res.json({
                    signUpSuccess: false,
                    message: "이미 존재하는 아이디입니다."
                })
                console.log('Sign Up Fail! (DUPLICATE ID)');
            }
        });
};

// Log In
exports.logIn = (req, res) => {
    User.findOne({ userId: req.body.userId })
        .then(user => {
            if (!user) {
                res.json({ 
                    logInSuccess: false, 
                    message: "아이디가 존재하지 않습니다."
                });
                console.log('Log In Fail! (WRONG ID)');
            } else if (user.password !== req.body.password) {
                res.json({ 
                    logInSuccess: false, 
                    message: "비밀번호가 틀렸습니다."
                });
                console.log('Log In Fail! (WRONG PW)');
            } else {
                res.json({ 
                    logInSuccess: true, 
                    message: "로그인 성공"
                });
                console.log('Log In Success!');
            }
        });
};

// Get User Info
exports.getUserInfo = (req, res) => {
    const getCookies = req.get('Cookie');
    const cookies = Object.fromEntries(getCookies.split('; ').map(cookie => cookie.split('=')));
    if (cookies.logInUser) {
        User.findOne({ userId: cookies.logInUser })
            .then(user => {
                res.json(user);
                console.log('Get User Info Success!');
            });
    } else {
        res.json({ 
            getUserInfoSuccess: false,
            message: "로그인 후 시도하세요."
        });
        console.log('Get User Info FAIL! (NOT LOG IN)');
    }
};
