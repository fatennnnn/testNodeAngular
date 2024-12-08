const bcrypt = require("bcrypt");
const User = require("../models/User");
const config = require("config");
const email = config.get("email");
const password = config.get("password");

const createAdmin = async() => {
    try {
        const existedAdmin = await User.findOne({ email });
        if (!existedAdmin) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                email,
                password: hashedPassword,
                role: "admin",
            });
            await user.save();
            console.log("admin created");
        }
        console.log("admin already exist");
    } catch (error) {
        console.log(error);
    }
};

module.exports = createAdmin;