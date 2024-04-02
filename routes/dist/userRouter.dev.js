"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userControllers = _interopRequireDefault(require("../controllers/userControllers.js"));

var _authtenticate = _interopRequireDefault(require("../middlewars/authtenticate.js"));

var _upload = _interopRequireDefault(require("../middlewars/upload.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.post("/register", _userControllers["default"].register);
userRouter.post("/login", _userControllers["default"].login);
userRouter.get("/current", _authtenticate["default"], _userControllers["default"].getCurrent);
userRouter.post("/logout", _authtenticate["default"], _userControllers["default"].logout);
userRouter.patch("/avatars", _upload["default"].single("photo"), _authtenticate["default"], _userControllers["default"].changeAvatar);
userRouter.get("/verify/:verificationToken", _userControllers["default"].verify);
userRouter.post("/verify", _userControllers["default"].verifyAgain);
var _default = userRouter;
exports["default"] = _default;