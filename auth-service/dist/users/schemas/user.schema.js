"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema([{
        id: String,
        username: String,
        password: String,
        userId: String,
        role: String
    }]);
//# sourceMappingURL=user.schema.js.map