import {app} from "./app"
import {signUp} from "./endpoints/signup"
import {login} from "./endpoints/login"
import {getProfileInfo} from "./endpoints/getProfileInfo"
import {createRecipe} from "./endpoints/createRecipe"
import {getRecipeById} from "./endpoints/getRecipeById"
import {getUserById} from "./endpoints/getUserById"
import {followUser} from "./endpoints/followUser"
import {unfollowUser} from "./endpoints/unfollowUser"
import {getFollowedUsersRecipes} from "./endpoints/getRecipesFeed"
import {editRecipe} from "./endpoints/editRecipe"
import {deleteRecipe} from "./endpoints/deleteRecipe"
import {deleteUser} from "./endpoints/deleteUser"
import {forgotPassword} from "./endpoints/forgotPassword"

app.post("/signup", signUp)
app.post("/login", login)
app.get("/profile", getProfileInfo)
app.post("/recipes", createRecipe)
app.get("/recipes/:id", getRecipeById)
app.get("/users/:id", getUserById)
app.post("/user/follow", followUser)
app.post("/user/unfollow", unfollowUser)
app.get("/feed", getFollowedUsersRecipes)
app.put("/recipes/:id", editRecipe)
app.delete("/recipes/:id", deleteRecipe)
app.delete("/users/:id", deleteUser)
app.put("/forgot-password", forgotPassword)