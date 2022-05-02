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
exports.deleteUser = void 0;
const UserDatabase_1 = require("../data/UserDatabase");
const Authenticator_1 = require("../services/Authenticator");
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            if (!id) {
                throw new Error("Missing id");
            }
            const token = req.headers.authorization;
            const authenticator = new Authenticator_1.Authenticator();
            const authenticationData = authenticator.getData(token);
            const userDatabase = new UserDatabase_1.UserDatabase();
            const user = yield userDatabase.getUserById(authenticationData.id);
            if (user.getRole() !== "admin") {
                throw new Error("You can't delete an user if you are not an admin");
            }
            yield userDatabase.deleteUserAndRelations(id);
            res.status(200).send({ message: "User deleted" });
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
exports.deleteUser = deleteUser;
//# sourceMappingURL=deleteUser.js.map