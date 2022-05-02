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
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const User_1 = require("../types/User");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield BaseDatabase_1.BaseDatabase.connection("users_cookenu")
                    .select("*")
                    .where({ email: email });
                return user[0] && User_1.User.toUserModel(user[0]);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield BaseDatabase_1.BaseDatabase.connection("users_cookenu")
                    .select("*")
                    .where({ id: id });
                return user[0] && User_1.User.toUserModel(user[0]);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.BaseDatabase.connection("users_cookenu")
                    .insert({
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    password: user.getPassword(),
                    role: user.getRole(),
                });
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    followUser(followerId, followedId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.BaseDatabase.connection("followers")
                    .insert({
                    follower_id: followerId,
                    followed_id: followedId,
                });
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    unfollowUser(followerId, followedId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.BaseDatabase.connection("followers")
                    .where({
                    follower_id: followerId,
                    followed_id: followedId,
                })
                    .del();
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    checkIfAlredyFollowing(followerId, followedId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.BaseDatabase.connection("followers")
                    .where({
                    follower_id: followerId,
                    followed_id: followedId,
                })
                    .select("*");
                return result.length > 0;
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    getFollowersRecipes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const followers = yield BaseDatabase_1.BaseDatabase.connection("followers")
                    .select("*")
                    .where({
                    follower_id: userId,
                });
                const recipes = yield BaseDatabase_1.BaseDatabase.connection("receitas_cookenu")
                    .select("*")
                    .whereIn("user_id", followers.map((follower) => follower.followed_id));
                return recipes;
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    deleteUserAndRelations(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.BaseDatabase.connection("followers")
                    .where({
                    follower_id: userId,
                })
                    .del();
                yield BaseDatabase_1.BaseDatabase.connection("followers")
                    .where({
                    followed_id: userId,
                })
                    .del();
                yield BaseDatabase_1.BaseDatabase.connection("receitas_cookenu")
                    .where({
                    user_id: userId,
                })
                    .del();
                yield BaseDatabase_1.BaseDatabase.connection("users_cookenu")
                    .where({
                    id: userId,
                })
                    .del();
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    changePassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.BaseDatabase.connection("users_cookenu")
                    .where({
                    id: userId,
                })
                    .update({
                    password: newPassword,
                });
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
}
exports.UserDatabase = UserDatabase;
//# sourceMappingURL=UserDatabase.js.map