const express = require("express");
const dotenv = require("dotenv");
const connecttodb = require("./utils/db");
const userRoute = require("./Routes/user-routes");
const blogRoute = require("./Routes/blog-routes");
const { verifyAuthorization } = require("./middlewares/auth-middleware");

//configure env file
dotenv.config();

//connect to database
connecttodb(process.env.MONGO_DB_URL);

//initialize app
const app = express();

//use json structure
app.use(express.json());

//routes
//default route
app.get("/", (re, res) => {
  res.status(200).json({ status: 200, message: "Welcome to BlogSpot" });
});
//user route
app.use("/user", userRoute);

//blog route
app.use("/blog", verifyAuthorization, blogRoute);

app.listen(process.env.PORT || 3000, "0.0.0.0", () =>
  console.log(`server started at ${process.env.PORT || 3000} `)
);
