"use strict"
const router = require('express').Router();
const axios = require('axios');

router.route('/invite')
.post((req, res) => {
  let token = process.env.SLACK_TOKEN || 'no_token';
  let user_email = req.query.email;
  let slack_invite_endpoint = 'https://slack.com/api/users.admin.invite';
  let query = `email=${user_email}&token=${token}&set_active=true`;
  let endpoint_url= `${slack_invite_endpoint}?${query}`;
  console.log(endpoint_url);

    axios.get(endpoint_url)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log('ERROR', err);
    });

});

module.exports = router;
