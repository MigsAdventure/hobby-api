"use strict"

const ENV = process.env.NODE_ENV;
const CURR_APP = process.env.NODE_APP;
const DB_URI = process.env.DB_URI || `mongodb://localhost/${CURR_APP}`;

let SITE_URL = "http://codeandcoffee.com" || "http://migsadventure.com";
let SITE_PROTOCOL = 'https://';
let SITE_URI = '';
let PORT = '';

// THIS NEEDS WORK for cross origin

// switch(CURR_APP) {
//   case 'codeandcoffee': {
//     SITE_URI = 'codeandcoffeeoc.com';
//   }break;
//   case 'accessdriven': {
//     SITE_URI = 'accessdriven.com';
//   }break;
//   default: SITE_URI = 'migsadventure.com';
// }

if(process.env.NODE_ENV !== "production") {
  // SITE_URI = '127.0.0.1';
  // PORT = ':8000';
   SITE_URL = 'http://127.0.0.1:8000'
}

// const SITE_URL = SITE_PROTOCOL + SITE_URI + PORT;



module.exports = {
  SITE_URL,
  DB_URI
};
