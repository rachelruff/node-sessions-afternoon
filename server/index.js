const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

//

const sc = require(`./controllers/swag_controller`);
//swag controller
const ac = require("./controllers/auth_controller");
//auth controller
const cc = require("./controllers/cart_controller");
//cart controller
const searchc = require("./controllers/search_controller");
//search controller

require("dotenv").config();

//

//Middleware
const checkForSession = require("./middlewares/checkForSession");
const app = express();
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/build`));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10000 }
  })
);
app.use(checkForSession);

//

app.get("api/swag", sc.read);
app.post("/api/login", ac.login);
app.post("/api/register", ac.register);
app.post("/api/signout", ac.signout);
app.get("/api/user", ac.getUser);
app.post("/api/cart", cc.add);
app.post("/api/cart", cc.checkout);
app.delete("api/cart", cc.delete);
app.get("/api/search", searchc.search);

//

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
