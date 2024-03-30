"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var userServices = _interopRequireWildcard(require("../services/userServices.js"));

var _HttpError = _interopRequireDefault(require("../helpers/HttpError.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JWT_SECRET = process.env.JWT_SECRET;

var register = function register(req, res, next) {
  var email, user, newUser;
  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          email = req.body.email;
          _context.next = 4;
          return regeneratorRuntime.awrap(userServices.findUser({
            email: email
          }));

        case 4:
          user = _context.sent;

          if (!user) {
            _context.next = 7;
            break;
          }

          throw (0, _HttpError["default"])(409, "Email already in use");

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(userServices.signup(req.body));

        case 9:
          newUser = _context.sent;
          res.status(201).json({
            email: newUser.email,
            subscription: newUser.subscription
          });
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

var login = function login(req, res, next) {
  var _req$body, email, password, user, passwordCompare, payload, token;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(userServices.findUser({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          throw (0, _HttpError["default"])(401, "Email or password invalid");

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, user.password));

        case 9:
          passwordCompare = _context2.sent;

          if (passwordCompare) {
            _context2.next = 12;
            break;
          }

          throw (0, _HttpError["default"])(401, "Email or password invalid");

        case 12:
          payload = {
            id: user._id
          };
          token = _jsonwebtoken["default"].sign(payload, JWT_SECRET, {
            expiresIn: "23h"
          });
          _context2.next = 16;
          return regeneratorRuntime.awrap(userServices.setToken(user._id, token));

        case 16:
          res.json({
            token: token,
            user: {
              email: user.email,
              subscription: user.subscription
            }
          });
          _context2.next = 22;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 19]]);
};

var getCurrent = function getCurrent(req, res, next) {
  var _req$user, email, subscription;

  return regeneratorRuntime.async(function getCurrent$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            _req$user = req.user, email = _req$user.email, subscription = _req$user.subscription;
            res.json({
              email: email,
              subscription: subscription
            });
          } catch (error) {
            next(error);
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var logout = function logout(req, res, next) {
  var _id;

  return regeneratorRuntime.async(function logout$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _id = req.user._id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(userServices.setToken(_id));

        case 4:
          res.json({
            message: "Signout success"
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var _default = {
  register: register,
  login: login,
  getCurrent: getCurrent,
  logout: logout
};
exports["default"] = _default;