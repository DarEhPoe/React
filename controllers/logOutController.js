//const usersDB={
//    users:require('../model/users.json'),
//    setUsers:function(data){this.users=data}
//}
//const path=require('path');
//const fsPromises=require('fs').promises;
const User=require('../model/User');
const LogOutWebToken= async(req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204)//No content;
    const refreshToken=cookies.jwt;

    //is refrsh token in db?
    //const foundUser=usersDB.users.find(parson=>parson.refreshToken === refreshToken);
    const foundUser= await User.findOne({refreshToken}).exec();
    if(!foundUser) {
        res.clearCookie('jwt',{httpOnly:true,maxAge:24*60*60*1000});
        return res.sendStatus(403)//forbidden
    }
    //const ohterUsers= usersDB.users.filter(person=>person.refreshToken !== foundUser.refreshToken);
    //const currentUser={...foundUser.username,refreshToken:""};
    //usersDB.setUsers([...ohterUsers,currentUser]);
    //await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'),
    //JSON.stringify(usersDB.users)
    //)
    foundUser.refreshToken='';
    const result= await foundUser.save();
    console.log(result);
    res.clearCookie('jwt',{httpOnly:true,maxAge:24*60*60*1000});
    res.sendStatus(204)//
}
module.exports={LogOutWebToken};