//const usersDB={
//    users:require('../model/users.json'),
//    setUsers:function(data){this.users=data}
//}
const User=require('../model/User');
const jwt=require('jsonwebtoken');


const refreshToken=async (req,res)=>{
    const cookies=req.cookies;
    console.log("cookies:",cookies)
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken=cookies.jwt;
    const foundUser=await User.findOne({refreshToken}).exec();
    if(!foundUser) return res.sendStatus(403);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err || foundUser.username !== decoded.username) return sendStatus(403);
            const roles=Object.values(foundUser.roles);
            const accessToken=jwt.sign(
                {
                    "UserInfo":{
                        "username":decoded.username,
                        "roles":roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'30s'}
            );
            console.log(foundUser);
            res.json({accessToken})
        }
    )
    
}
module.exports={refreshToken};