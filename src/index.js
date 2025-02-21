const config = require("./config/config");

const express = require("express");

const app = express();

const authRoutes = require("./routes/index");
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);

app.listen(config.PORT, () => {
  console.log(`App is running on port ${config.PORT}`);
});
