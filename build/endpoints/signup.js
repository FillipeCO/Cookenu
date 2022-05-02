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
exports.signUp = void 0;
const User_1 = require("../types/User");
const UserDatabase_1 = require("../data/UserDatabase");
const generateId_1 = require("../services/generateId");
const HashManager_1 = require("../services/HashManager");
const Authenticator_1 = require("../services/Authenticator");
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, role } = req.body;
            if (!name || !email || !password || !role) {
                throw new Error("Missing input, name, email, password or role");
            }
            if (role !== "normal" && role !== "admin") {
                throw new Error("Invalid role, must be 'normal' or 'admin'");
            }
            if (password.length < 6) {
                throw new Error("Password must have at least 6 characters");
            }
            const idGenerator = new generateId_1.IdGenerator();
            const id = idGenerator.generate();
            const userDatabase = new UserDatabase_1.UserDatabase();
            const user = yield userDatabase.findUserByEmail(email);
            const hashPassword = yield new HashManager_1.HashManager().hash(password);
            if (user) {
                throw new Error("User email is already registered");
            }
            const createdUser = new User_1.User(id, name, email, hashPassword, role);
            yield userDatabase.createUser(createdUser);
            const authenticator = new Authenticator_1.Authenticator();
            const token = authenticator.generate({ id, role });
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
exports.signUp = signUp;
//# sourceMappingURL=signup.js.map