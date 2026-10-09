import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next)=>{
const authHeader = req.headers.authorization;
// console.log(authHeader, 'authHeader');

if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(401).json({message: 'Unauthorized'});
}
// console.log(authHeader.split(' '), 'before');
const token = authHeader.split(' ')[1];
console.log(token, 'token');

try{
    const decoded = jwt.verify(token, "this is my secret key");
    console.log(decoded, 'decoded');
    req.user = decoded;
}catch(err){
    console.log(err, 'err');
    return res.status(401).json({message: 'Unauthorized'});
}


next();
}