const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();

const { logger } = require("./middlewares/loggerMiddleware");
const { handleErrors } = require("./middlewares/errorMiddleware");
const { requireAuth } = require("./middlewares/authMiddleware");
const {
  validateScholarshipInput,
  handleValidationErrors,
} = require("./middlewares/validateMiddleware");
const { cacheMiddleware } = require("./middlewares/cacheMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your_secret_session_key",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(logger);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const authRoutes = require("./routes/authRoutes");
const scholarshipRoutes = require("./routes/scholarshipRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const gamificationRoutes = require("./routes/gamificationRoutes");
const forumRoutes = require("./routes/forumRoutes");

app.use("/auth", authRoutes);
app.use(
  "/scholarships",

  scholarshipRoutes
);
app.use("/notifications", [requireAuth], notificationRoutes);
app.use("/gamification", [requireAuth], gamificationRoutes);
app.use("/forum", [requireAuth], forumRoutes);

app.use(handleErrors);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
