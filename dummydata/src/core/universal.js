import 'moment';
import {alphanumeric,powrandom} from "../util/random"

export class Universal {

  number(){
    return Math.floor(Math.pow(10,Math.random()*10));
  }

  today() {
    return moment().format("YYYY-MM-DD");
  }

  // earlierDate: Pick a date up to three years before today's date.
  earlierDate() {
    return moment().subtract(Math.pow(365.25*3,Math.random()),'days').format("YYYY-MM-DD");
  }

  // laterDate: Pick a date up to three years after today's date.
  laterDate() {
    return moment().add(Math.pow(365.25*3,Math.random()),'days').format("YYYY-MM-DD");
  }

  menuItems = [
    ["Number",this.number],
    ["Alphanumeric String",alphanumeric],
    null,
    ["Today",this.today],
    ["Earlier Date",this.earlierDate],
    ["Later Date",this.laterDate],
  ];

  constructor(dd) {

  }

}
