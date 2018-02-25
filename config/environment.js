"use strict"

const ENV = process.env.NODE_ENV;
const CURR_APP = process.env.NODE_APP;
const DB_URI = process.env.DB_URI || `mongodb://localhost/${CURR_APP}`;

let SITE_PROTOCOL = 'http://';
let SITE_URI = '';
let PORT = '';

switch(CURR_APP) {
  case 'perler': {
    SITE_URI = 'migsadventure.com';
  }break;
  case 'accessdriven': {
    SITE_URI = 'accessdriven.com';
  }break;
  default: SITE_URI = 'migsadventure.com';
}

if(process.env.NODE_ENV !== "production") {
  SITE_URI = 'localhost';
  PORT = ':8080';
}

const SITE_URL = SITE_PROTOCOL + SITE_URI + PORT;

module.exports = {
  SITE_URL,
  DB_URI
};
