"use strict"
const router = require('express').Router();
const axios = require('axios');

router.route('/invite')
.post((req, res) => {
  let token = process.env.SLACK_TOKEN;
  let user_email = req.body.email;
  let slack_invite_endpoint = 'https://slack.com/api/users.admin.invite';
  let query = `email=${user_email}&token=${token}&set_active=true`;
  let endpoint_url= `${slack_invite_endpoint}?${query}`;

    axios.get(endpoint_url)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log('ERROR', err);
    });

});

module.exports = router;
