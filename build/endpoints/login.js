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
exports.login = void 0;
const UserDatabase_1 = require("../data/UserDatabase");
const HashManager_1 = require("../services/HashManager");
const Authenticator_1 = require("../services/Authenticator");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new Error("Missing input email or password");
            }
            if (password.length < 6) {
                throw new Error("Password must have at least 6 characters");
            }
            const userDatabase = new UserDatabase_1.UserDatabase();
            const user = yield userDatabase.findUserByEmail(email);
            const hashManager = new HashManager_1.HashManager();
            const isPasswordCorrect = yield hashManager.compare(password, user.getPassword());
            if (!user) {
                throw new Error("User email is not registered");
            }
            if (!isPasswordCorrect) {
                throw new Error("Invalid password or email");
            }
            const authenticator = new Authenticator_1.Authenticator();
            const token = authenticator.generate({ id: user.getId(), role: user.getRole() });
            res.status(200).send({ token });
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
exports.login = login;
//# sourceMappingURL=login.js.map