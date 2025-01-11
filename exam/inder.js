/* eslint-disable no-undef */
const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/db");
const userRoute = require("./routes/userRoutes");
const questionRoute = require("./routes/questionRoutes");
const examRoute = require("./routes/examRoutes");
const resultsRoute = require("./routes/resultRoutes");
dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/v1/users", userRoute);
app.use("/api/v1/questions", questionRoute);
app.use("/api/v1/exams", examRoute);
app.use("/api/v1/results", resultsRoute);
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  dbConnect();
});
