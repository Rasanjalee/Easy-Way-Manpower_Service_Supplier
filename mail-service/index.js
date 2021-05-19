const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const details = require('./details.json');

const app = express();
app.use(cors({origin:"*"}));
app.use(bodyParser.json());

app.listen(3005,()=>{
    console.log("this server started on port 3004 !!!");
});

app.get('/',(req,res)=>{
    res.send(
        "<h1>hello</h1>"
    );
});

app.post("/sendmail",(req,res)=>{
    console.log("request came");
    let user = req.body;
    sendMail(user,info=>{
        console.log("the mail send");
        res.send(info);
    });

});


async function sendMail(user,callback){

    let transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:"easyWay.manpowerService@gmail.com",
            pass:"2021EasyWay"
        }
    });


let mailOptions= {
    from:'"EasyWay Manpower"',
    to:user.email,
    subject:"Welcome to Easy way",
    html:`<h1> Hi ${user.name} &#128512;</h1><br>
    <h4> Thanks for Joining us...</h4>`
}
let info = await transporter.sendMail(mailOptions);

callback(info);
}