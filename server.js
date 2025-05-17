const connectDB = require("./config/connectDB");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const compression = require("compression");
const globalErrorHandler = require("./middlewares/errormiddleware");
const authRoutes = require("./routes/authRoutes");
const albumRoutes = require("./routes/albumRoutes");
const protect = require("./middlewares/authmiddleware");

// Load env variables
dotenv.config();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Create an instance of express
const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security Middlewares
// Set security headers
app.use(helmet());

// rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later",
});

app.use(limiter);

// prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors({ credentials: true }));

// Compression
app.use(compression());

// Routes
app.use("/v1", authRoutes);
app.use("/v1/albums", protect, albumRoutes);

// Error handler
app.use(globalErrorHandler);

// Connect to Server
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
