import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
const token = jwt.sign({ id: user._id }, "this is my secret key");
console.log("Token generated:", token);
return token;
}
    