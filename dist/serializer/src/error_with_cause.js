"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/** Exception nesting.  */
var ErrorWithCause =
/*#__PURE__*/
function () {
  function ErrorWithCause(message, cause) {
    this.message = message;

    if (typeof cause !== "undefined" && cause !== null ? cause.message : undefined) {
      this.message = "cause\t" + cause.message + "\t" + this.message;
    }

    var stack = ""; //(new Error).stack

    if (typeof cause !== "undefined" && cause !== null ? cause.stack : undefined) {
      stack = "caused by\n\t" + cause.stack + "\t" + stack;
    }

    this.stack = this.message + "\n" + stack;
  }

  ErrorWithCause["throw"] = function _throw(message, cause) {
    var msg = message;

    if (typeof cause !== "undefined" && cause !== null ? cause.message : undefined) {
      msg += "\t cause: " + cause.message + " ";
    }

    if (typeof cause !== "undefined" && cause !== null ? cause.stack : undefined) {
      msg += "\n stack: " + cause.stack + " ";
    }

    throw new Error(msg);
  };

  return ErrorWithCause;
}();

var _default = ErrorWithCause;
exports["default"] = _default;
module.exports = exports.default;