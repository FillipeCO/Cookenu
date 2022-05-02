import * as jwt from "jsonwebtoken";
import { USER_ROLES } from "../types/User";
import dotenv from "dotenv";
dotenv.config();

export interface AuthenticationData {
    id: string;
    role: USER_ROLES;
}

export class Authenticator {
    public generate(input: AuthenticationData): string {
        const token = jwt.sign(
            {
                id: input.id,
                role: input.role,
            },
            process.env.JWT_KEY as string,
            { expiresIn: "50m" }
        );

        return token;
    }

    public getData(token: string): AuthenticationData {
        const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
        const result = {
            id: payload.id,
            role: payload.role,
        };

        return result;
    }
}