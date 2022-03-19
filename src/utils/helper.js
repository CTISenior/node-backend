"use strict";

var diff_in_minutes = (dt1,dt2) => {
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}


module.exports = {
    diff_in_minutes,
  };