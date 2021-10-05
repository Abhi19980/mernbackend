const express = require("express");
// var bodyParser = require("body-parser")
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn.js");
const Register = require("./models/registers");
const port = process.env.PORT || 3000;
// always use double underscore while giving the dirname name path.
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

// this console command is to show the folder,file structure
// console.log(path.join(__dirname,"../public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(static_path));
// app.use('/',Register);
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("register");
});
// app.get("./register",(req,res)=>{
//     res.render("register");
// })
// create new user database
app.post("/", async (req, res) => {
    try {
        // console.log(req.body.firstname);
        // res.send(req.body.firstname); 
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password === cpassword) {


        } else {
            res.send("password are not matching")
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post('/register', async (req, res) => {
    try {
        const { firstname, myemail, mypassword } = req.body;
        const email=myemail
        const password=mypassword
        console.log(req.body);
        console.log({email, password, firstname});
        const user = await Register.findOne({ email });
        if (user != null) {
            res.status(403).json({ message: 'user already exists' });
            return;
        }

        const newUser = new Register({ email, password, confirmpassword: password, username: firstname })
        await newUser.save()

        res.status(201).json({ message: 'User registered' })
    } catch (e) { console.error(e); res.json(e) }
})

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})