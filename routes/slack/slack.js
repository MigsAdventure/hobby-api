"use strict"
const router = require('express').Router();
const axios = require('axios');

router.route('/invite')
.post((req, res) => {
  const token = process.env.SLACK_TOKEN;
  const user_email = req.body.email;
  const slack_invite_endpoint = 'https://slack.com/api/users.admin.invite';
  const query = `email=${user_email}&token=${token}&set_active=true`;
  const endpoint_url= `${slack_invite_endpoint}?${query}`;

    axios.get(endpoint_url)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log('ERROR', err);
    });

});

module.exports = router;
