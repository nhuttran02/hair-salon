require("dotenv").config();
const express = require("express");
const cors = require("cors");

const JSend = require("./jsend");
const servicesRouter = require("./router/services.router");
const appointmentsRouter = require("./router/appointments.router");
const customersRouter = require("./router/customers.router");
const staffRouter = require("./router/staff.router");
const adminRouter = require("./router/admin.router");
const authRouter = require("./router/auth.router");
const usersRouter = require("./router/users.router");
const branchRouter = require('./router/branch.router');
const hairstyleRouter = require('./router/hairstyle.router');
const addressRouter = require('./router/address.router');
const path = require("path");


const {
  resourceNotFound,
  handleError,
} = require("./controllers/errors.controller");
const { specs, swaggerUi } = require("./docs/swagger");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json(JSend.success());
});

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/public", express.static("public"));

servicesRouter.setup(app);
appointmentsRouter.setup(app);
customersRouter.setup(app);
staffRouter.setup(app);
adminRouter.setup(app);
branchRouter.setup(app);
hairstyleRouter.setup(app);
addressRouter.setup(app);
usersRouter.setup(app);


// Đăng nhập
app.use("/api", authRouter);

// Handle 404 response
app.use(resourceNotFound);

// Defined error-handling middleware last, after other app.use() and router calls
app.use(handleError);

// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// app.use('/public', express.static(path.join(__dirname, 'public')));



module.exports = app;
