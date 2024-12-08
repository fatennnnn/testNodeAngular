const express = require('express');
const app = express();
const connectDB = require("./config/db");
const createAdmin = require("./utils/createAdmin");
const user = require("./routes/user");
const auth = require("./routes/auth")
const cookieParser = require("cookie-parser");
const cors = require('cors'); // Import cors

const PORT = process.env.PORT || 3000;


var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8081"],
  })
);//// init middleware this allows us to get the data in req.body
app.use(express.json({ extended: false }));
// connect database
connectDB();
//insert adminto database
createAdmin();
app.use(cookieParser()); // Ajoute le middleware pour analyser les cookies

app.use("/user", user);
app.use("/auth",auth)
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});