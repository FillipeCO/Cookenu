"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.USER_ROLES = void 0;
var USER_ROLES;
(function (USER_ROLES) {
    USER_ROLES["ADMIN"] = "admin";
    USER_ROLES["NORMAL"] = "normal";
})(USER_ROLES = exports.USER_ROLES || (exports.USER_ROLES = {}));
class User {
    constructor(id, name, email, password, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    static toUserModel(data) {
        return new User(data.id, data.name, data.email, data.password, data.role);
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getRole() {
        return this.role;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map