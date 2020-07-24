"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTTP = exports.USER_AGENT = exports.VERSION = exports.SANDBOX = exports.PRODUCTION = exports.OPERATIONS = exports.QUERY_TRANSACTION_STATUS = exports.REVERSAL = exports.B2C_PAYMENT = exports.B2B_PAYMENT = exports.C2B_PAYMENT = exports.PATTERNS = exports.ERRORS = void 0;

var _operation = require("./operation.cjs");

var _version = require("./version.cjs");

var _environment = require("./environment.cjs");

var _OPERATIONS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var USER_AGENT = "MPesa";
exports.USER_AGENT = USER_AGENT;
var C2B_PAYMENT = "C2B_PAYMENT";
exports.C2B_PAYMENT = C2B_PAYMENT;
var B2B_PAYMENT = "B2B_PAYMENT";
exports.B2B_PAYMENT = B2B_PAYMENT;
var B2C_PAYMENT = "B2C_PAYMENT";
exports.B2C_PAYMENT = B2C_PAYMENT;
var REVERSAL = "REVERSAL";
exports.REVERSAL = REVERSAL;
var QUERY_TRANSACTION_STATUS = "QUERY_TRANSACTION_STATUS";
exports.QUERY_TRANSACTION_STATUS = QUERY_TRANSACTION_STATUS;
var VERSION = new _version.Version(0, 1, 0);
exports.VERSION = VERSION;
var HTTP = {
  METHOD: {
    GET: "get",
    POST: "post"
  },
  HEADERS: {
    USER_AGENT: "User-Agent",
    CONTENT_TYPE: "Content-Type",
    ORIGIN: "Origin",
    AUTHORIZATION: "Authorization"
  }
};
exports.HTTP = HTTP;
var SANDBOX = new _environment.Environment({
  scheme: "https",
  domain: "api.sandbox.vm.co.mz"
});
exports.SANDBOX = SANDBOX;
var PRODUCTION = new _environment.Environment({
  scheme: "https",
  domain: "api.mpesa.vm.co.mz"
});
exports.PRODUCTION = PRODUCTION;
var PATTERNS = {
  PHONE_NUMBER: /^((00|\+)?(258))?8[45][0-9]{7}$/,
  MONEY_AMOUNT: /^[1-9][0-9]*(\.[0-9]+)?$/,
  WORD: /^\w+$/,
  SERVICE_PROVIDER_CODE: /^[0-9]{5,6}$/
};
exports.PATTERNS = PATTERNS;
var OPERATIONS = (_OPERATIONS = {}, _defineProperty(_OPERATIONS, C2B_PAYMENT, new _operation.Operation({
  method: HTTP.METHOD.POST,
  port: "18352",
  path: "/ipg/v1x/c2bPayment/singleStage/",
  mapping: {
    from: "input_CustomerMSISDN",
    to: "input_ServiceProviderCode",
    amount: "input_Amount",
    transaction: "input_TransactionReference",
    reference: "input_ThirdPartyReference"
  },
  validation: {
    from: PATTERNS.PHONE_NUMBER,
    to: PATTERNS.SERVICE_PROVIDER_CODE,
    amount: PATTERNS.MONEY_AMOUNT,
    transaction: PATTERNS.WORD,
    reference: PATTERNS.WORD
  },
  required: ["to", "from", "amount", "transaction", "reference"],
  optional: ["from"]
})), _defineProperty(_OPERATIONS, B2B_PAYMENT, new _operation.Operation({
  method: HTTP.METHOD.POST,
  port: "18349",
  path: "/ipg/v1x/b2bPayment/",
  mapping: {
    number: "input_CustomerMSISDN",
    from: "input_CustomerMSISDN",
    to: "input_ServiceProviderCode",
    amount: "input_Amount",
    transaction: "input_TransactionReference",
    reference: "input_ThirdPartyReference"
  },
  validation: {
    from: PATTERNS.SERVICE_PROVIDER_CODE,
    to: PATTERNS.SERVICE_PROVIDER_CODE,
    amount: PATTERNS.MONEY_AMOUNT,
    transaction: PATTERNS.WORD,
    reference: PATTERNS.WORD
  },
  required: ["to", "from", "amount", "transaction", "reference"],
  optional: ["from"]
})), _defineProperty(_OPERATIONS, B2C_PAYMENT, new _operation.Operation({
  method: HTTP.METHOD.POST,
  port: "18345",
  path: "/ipg/v1x/b2cPayment/",
  mapping: {
    number: "input_CustomerMSISDN",
    to: "input_CustomerMSISDN",
    from: "input_ServiceProviderCode",
    amount: "input_Amount",
    transaction: "input_TransactionReference",
    reference: "input_ThirdPartyReference"
  },
  validation: {
    from: PATTERNS.SERVICE_PROVIDER_CODE,
    to: PATTERNS.PHONE_NUMBER,
    amount: PATTERNS.MONEY_AMOUNT,
    transaction: PATTERNS.WORD,
    reference: PATTERNS.WORD
  },
  required: ["to", "from", "amount", "transaction", "reference"],
  optional: ["to"]
})), _defineProperty(_OPERATIONS, REVERSAL, new _operation.Operation({
  method: HTTP.METHOD.POST,
  port: "18352",
  path: "/ipg/v1x/",
  mapping: {
    from: PATTERNS.PHONE_NUMBER,
    to: "input_ServiceProviderCode",
    amount: "input_Amount",
    transaction: "input_TransactionReference",
    reference: "input_ThirdPartyReference"
  },
  validation: {},
  required: [],
  optional: []
})), _defineProperty(_OPERATIONS, QUERY_TRANSACTION_STATUS, new _operation.Operation({
  method: HTTP.METHOD.GET,
  port: "18352",
  path: "/ipg/v1x/",
  mapping: {
    number: "input_CustomerMSISDN",
    from: "input_CustomerMSISDN",
    to: "input_ServiceProviderCode",
    amount: "input_Amount",
    transaction: "input_TransactionReference",
    reference: "input_ThirdPartyReference"
  },
  validation: {},
  required: [],
  optional: []
})), _OPERATIONS);
exports.OPERATIONS = OPERATIONS;
var ERRORS = {
  VALIDATION: {
    code: 3000,
    description: "The data provider is not valid"
  },
  MISSING: {
    code: 3001,
    description: "There are attributes missing to complete the transaction"
  },
  AUTHENTICATION: {
    code: 3002,
    description: "There is not a public key and API key or access token set"
  },
  INVALID_OPERATION: {
    code: 3003,
    descrition: "Unable to detect the operation from the destination number"
  },
  INVALID_ENV: {
    code: 3003,
    descrition: "Unable to detect the base URL"
  }
};
exports.ERRORS = ERRORS;