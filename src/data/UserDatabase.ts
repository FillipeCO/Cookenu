import { BaseDatabase } from "./BaseDatabase";
import { User } from "../types/User";

export class UserDatabase extends BaseDatabase {
  public async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await BaseDatabase.connection("users_cookenu")
        .select("*")
        .where({ email: email });

      return user[0] && User.toUserModel(user[0]);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserById(id: string): Promise<User> {
    try {
      const user = await BaseDatabase.connection("users_cookenu")
        .select("*")
        .where({ id: id });

      return user[0] && User.toUserModel(user[0]);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

    public async createUser(user: User): Promise<void> {
        try {
            await BaseDatabase.connection("users_cookenu")
                .insert({
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    password: user.getPassword(),
                    role: user.getRole(),
                });
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async followUser(followerId: string, followedId: string): Promise<void> {
        try {
            await BaseDatabase.connection("followers")
                .insert({
                    follower_id: followerId,
                    followed_id: followedId,
                });
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async unfollowUser(followerId: string, followedId: string): Promise<void> {
        try {
            await BaseDatabase.connection("followers")
                .where({
                    follower_id: followerId,
                    followed_id: followedId,
                })
                .del();
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async checkIfAlredyFollowing(followerId: string, followedId: string): Promise<boolean> {
        try {
            const result = await BaseDatabase.connection("followers")
                .where({
                    follower_id: followerId,
                    followed_id: followedId,
                })
                .select("*");

            return result.length > 0;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getFollowersRecipes (userId: string): Promise<any> {
        try {
            const followers = await BaseDatabase.connection("followers")
                .select("*")
                .where({
                    follower_id: userId,
                });

            const recipes = await BaseDatabase.connection("receitas_cookenu")
                .select("*")
                .whereIn("user_id", followers.map((follower: any) => follower.followed_id));

            return recipes;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async deleteUserAndRelations(userId: string): Promise<void> {
        try {
            await BaseDatabase.connection("followers")
                .where({
                    follower_id: userId,
                })
                .del();

            await BaseDatabase.connection("followers")
                .where({
                    followed_id: userId,
                })
                .del();

            await BaseDatabase.connection("receitas_cookenu")
                .where({
                    user_id: userId,
                })
                .del();

            await BaseDatabase.connection("users_cookenu")
                .where({
                    id: userId,
                })
                .del();
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async changePassword(userId: string, newPassword: string): Promise<void> {
        try {
            await BaseDatabase.connection("users_cookenu")
                .where({
                    id: userId,
                })
                .update({
                    password: newPassword,
                });
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
