"use strict";

exports.__esModule = true;
exports.get = get;
exports.set = set;

function get(state) {
  return function (key) {
    return state[key] || "";
  };
}

function set(state) {
  return function (key, value) {
    state[key] = value;
    return this;
  };
}