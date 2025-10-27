require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const urlRoutes = require('./routes/url.routes');
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: process.env.CLIENT_URL,
    optionSuccessStatus: "200"
}
connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api",urlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
