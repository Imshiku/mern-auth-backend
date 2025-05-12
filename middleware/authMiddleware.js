const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Making a registered user 

const registeringUser = async (req, res ) =>{
    const {name, email, password} = req.body;
    
    try{
let user = await User.findOne({email});
if (user){
    return res.status(400).json({ message:"user already exists"});
}

const hashedPassword = await bcrypt.hash(password, 10);

user = new User({
    name,
    email,
    password:hashedPassword
});

await user.save();

return res.status(201).json({message: "user registered sucessfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"server error"});
    }
}

//login user 


// const loginUser = async (req,res)=>{
//     const {email, password} = req.body;

// try{
//     //checking if user already exists
//      if(!user){
//         return res.status(400).json({message:"invalid email or password"})
//      }

// // match user 

// const isMatch = await bcrypt.compare(password, hashedPassword);
// if (!isMatch){
//     return res.status(401).json({message: "invaild email or password"});
// }

// //generating JWT Token

// const token = jwt.sign(
//     {userId: user._id, email: user.email},
//     process.env.JWT_SECRET,
//     {expiresIn : "1d"}
// );
// return res.status(201).json({
//     meassge: "login successfuly",
//     token,
//     user: {
//         id: user._Id,
//         email: user.email,
//         password: user.password

//     }
// });
// }
// catch(err){
//     console.error(err);
//     return res.status(500).json({message:"server error"});
// }
// };

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login successfully",
            token,
            user: {
                id: user._id,
                email: user.email,
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};


module.exports = {registeringUser,loginUser};

