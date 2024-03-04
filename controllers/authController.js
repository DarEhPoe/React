//const usersDB={
//    users:require('../model/users.json'),
//    setUsers:function(data){this.users=data}
//}
const User=require('../model/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
//const path=require('path');
//const fsPromises=require('fs').promises;
//const cookie=require('cookie-parser');

const handleLogin=async(req,res)=>{
    const {user,pwd}=req.body;
    if(!pwd || !user) return res.status(400).json({'message':'username and passwrd need!'});
    //const foundUser=usersDB.users.find(parson=>parson.username === user);
    const foundUser=await User.findOne({username: user}).exec();
    if(!foundUser) return res.sendStatus(401)//sendStatus(401)//unarthorized
    const match=await bcrypt.compare(pwd,foundUser.password);
    if(match){
        const roles=Object.values(foundUser.roles);
        //create JWT
        const accessToken=jwt.sign(
            {
                "UserInfo":{
                    "username":foundUser.username,
                    "roles":roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'30s'}

        )

        const refreshToken=jwt.sign(
            {"username":foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}

        )

        //const otherUsers=usersDB.users.filter(person=>person.username !== foundUser.username);
        //const currentUser={...foundUser,refreshToken}
        //usersDB.setUsers([...otherUsers,currentUser]);
        //await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'), JSON.stringify(usersDB.users))
        foundUser.refreshToken=refreshToken;
        const result= await foundUser.save();
        res.cookie('jwt',refreshToken,{httpOnly:true,maxAge:24*60*60*1000})
        res.json({accessToken});
        console.log(result);
    }else{
        res.sendStatus(401)//unauthorize
    }
}
module.exports={handleLogin};