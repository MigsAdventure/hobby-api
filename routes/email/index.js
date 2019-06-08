"use strict"
const router = require('express').Router();
const axios = require('axios');


const nodemailer = require("nodemailer");



router.route('/portfolio-contact')
.post((req, res) => {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: "migsadventure@gmail.com",
    subject: 'New message from contact form at tylerkrys.ca',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      console.log('ERROR: ', error);
      res.send('contact-failure');
    }
    else {
      console.log('RESPONSE: ', response);
      res.send('contact-success');
    }
  });
});

module.exports = router;
