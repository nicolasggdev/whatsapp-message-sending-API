const express = require("express");

const rateLimit = require("express-rate-limit");

const cors = require("cors");

const helmet = require("helmet");

const compression = require("compression");

const { whatsappRouter } = require("./routes/whastapp.routes");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  message:
    "Too many accounts created from this IP, please try again after an one minute",
});

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(limiter);

app.use("/api/v1/whatsapp", whatsappRouter);

// This is pending
// app.use("*", (req, res, next) => {
// next()
// })

module.exports = { app };
