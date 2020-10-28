"use strict"
const router = require('express').Router();
const axios = require('axios');
const formidable = require('formidable');
const request = require('request');



router.route('/auth')
/*
Callback endpoint the TDA app uses.
https://developer.tdameritrade.com/content/simple-auth-local-apps
*/

.get((req, res) => {
  const authRequest = {
    url: 'https://api.tdameritrade.com/v1/oauth2/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      'grant_type': 'authorization_code',
      'access_type': 'offline',
      'code': req.query.code, // get the code from url
      'client_id': process.env.TD_CLIENT_ID + "@AMER.OAUTHAP", // this client id comes from config vars
      'redirect_uri': process.env.TD_REDIRECT_URL
    }
  };
  
  // make the post request
  request(authRequest, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // parse the tokens
      var authReply = JSON.parse(body);
      // to check it's correct, display it
      res.send(authReply);
    }
  });
  
  
  
  
  
  // test from here next
  console.log('made it to GET')
  // var authRequest = {
  //   url: `https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=${process.env.TD_REDIRECT_URL}&client_id=${process.env.TD_CLIENT_ID}%40AMER.OAUTHAP`,
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  //   form: {
  //     'grant_type': 'authorization_code',
  //     'access_type': 'offline',
  //     'code': req.query.code, // get the code from url
  //   }
  // };
  
  // console.log('2nd STEP!!')
  // // make the post request
  // request(authRequest, function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     // parse the tokens
  //     var authReply = JSON.parse(body);
  //     // to check it's correct, display it
  //     res.send(authReply);
  //   }
  // });
  
  
  // axios.post(authRequest.url, {
  //   headers: {
  //     "content-type": "application/json",
  //     "Accept": "application/json"
  //   }
  // })
  // .then((response) => {
  //   console.log('MADE IT TO POST');
  //   console.log('PARSED!!!: ', JSON.parse(response.data));
  //   res.send(response.data);
  // })
  // .catch((err) => {
  //   console.log('ERROR', err);
  // });
  

  
});

module.exports = router;
