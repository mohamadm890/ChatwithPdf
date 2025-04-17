// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./config/db.cjs');
const pay = require('./config/paypal.js');


const folderRoutes = require('./routes/folderRoutes.cjs');
const fileRoutes = require('./routes/fileRoutes.js');
const retrieval = require('./routes/retrieverFile.js');
const filePdf = require('./routes/routerPdf_file.js');
const messageRoutes = require('./routes/messageRoutes.js');
const payment = require('./routes/paymentRoute.js');
const freeLimiter = require("./middleware/rateLimiter.js");
const verifyToken = require("./middleware/verifyToken.js");
const checkFileLimit = require("./middleware/rateLimitefile.js");
const reduceCredite = require("./middleware/reduceCredite.js");

const app = express();
const port = 3002;
app.use(cors());

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());

// Use routes
app.use('/folders', folderRoutes);
app.use('/upload', checkFileLimit, fileRoutes);
app.use('/chat', freeLimiter, verifyToken, reduceCredite, retrieval);
app.use('/file', filePdf);
app.use('/', messageRoutes);
app.use('/', payment);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
