const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//create the middleware for the parsing requested bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//define to the server that the static files are stored inside the public folder
app.use(express.static('public'));

//define the routes for home page and send-email page
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/public/send-email.html');
})

//configure nodemailer
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rajukumar87859@gmail.com', //replace with your email
    pass: 'uirh iigf lygx pbdy'
  }
});

//create the route for the form 
app.post('/send-email', (req,res) => {
    const {to,subject,message} =req.body;
    const mailOptions = {
        to,
        subject,
        message
    };

transporter.sendMail(mailOptions, (error, info) => {
    if(error){
        console.error(error);
        res.status(500).send('error in sending email');
    }else{
        console.log('Email sent: '+info.response);
        res.send('email sent successfully');
    }
});
});

app.listen (port, () => {
    console.log('server is running on port ${port}');
});