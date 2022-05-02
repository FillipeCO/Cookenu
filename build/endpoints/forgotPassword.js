"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = void 0;
const UserDatabase_1 = require("../data/UserDatabase");
const HashManager_1 = require("../services/HashManager");
const Mailer_1 = require("../services/Mailer");
function forgotPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new Error("Missing input, email or password");
            }
            if (password.length < 6) {
                throw new Error("Password must have at least 6 characters");
            }
            const userDatabase = new UserDatabase_1.UserDatabase();
            const user = yield userDatabase.findUserByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }
            const hashPassword = yield new HashManager_1.HashManager().hash(password);
            yield userDatabase.changePassword(user.getId(), hashPassword);
            yield (0, Mailer_1.run)(email, password);
            res.status(200).send({ message: "Password changed" });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).send({
                    message: err.message,
                });
            }
            else {
                res.status(500).send("Internal server error");
            }
        }
    });
}
exports.forgotPassword = forgotPassword;
//# sourceMappingURL=forgotPassword.js.map