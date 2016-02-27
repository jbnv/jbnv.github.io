import moment from 'moment';
import {alphanumeric,powrandom} from "../util/random"

var dateFormat = "YYYY-MM-DD";

function _number(){
  return Math.floor(Math.pow(10,Math.random()*10));
}

function _today() {
  return moment().format(dateFormat);
}

// earlierDate: Pick a date up to three years before today's date.
function _earlierDate() {
  return moment().subtract(Math.pow(365.25*3,Math.random()),'days').format(dateFormat);
}

// laterDate: Pick a date up to three years after today's date.
function _laterDate() {
  return moment().add(Math.pow(365.25*3,Math.random()),'days').format(dateFormat);
}

export default {
  number: _number,
  today: _today,
  earlierDate: _earlierDate,
  laterDate: _laterDate,

  menuItems: [
    ["Number",_number],
    ["Alphanumeric String",alphanumeric],
    null,
    ["Today",_today],
    ["Earlier Date",_earlierDate],
    ["Later Date",_laterDate],
  ]
}
