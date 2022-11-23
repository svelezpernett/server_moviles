require('dotenv').config();
const path       = require('path');
const cors       = require('cors');
const express    = require('express');
const apiRoutes  = require('./routes');
const { dbConnection } = require('./database');
const app    = express();

dbConnection()
// CONEXIÓN A BASE DE DATOS

// MIDDLEWARE
app.use(express.static("public"))
app.use(express.json())
app.use(cors())

app.use("/api",apiRoutes)

var port_number = app.listen(process.env.PORT || 4000);
app.listen(port_number);

