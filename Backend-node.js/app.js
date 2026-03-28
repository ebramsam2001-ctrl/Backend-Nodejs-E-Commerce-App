const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require('morgan');
const path = require("path");
const rfs = require('rotating-file-stream');

const authRoutes = require("./routes/authRoutes");
const productsRoutes = require("./routes/productsRouters");
const categoryRoutes = require("./routes/categoryRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

// Allow react project
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// log file
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'logs')
});

// General Middleware

// Logger middleware
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan("dev"));

// parse to json form. takes => {"name": "Alice"} and returns => req.body.name
app.use(express.json()); 

// parse to json form to but from form method. takes => name=Alice&age=25 and returns => req.body.name
app.use(express.urlencoded({extended: true}));


// session creation and cookie
app.use(session({
    secret: process.env.SESSION_SECRET || "No_Pain_No_Gain",
    resave: false,              // Only saves the session if something changed
    saveUninitialized: false,   // Only creates a session cookie once you actually store data
    cookie: {
        httpOnly: true, // It prevents malicious scripts (XSS attacks) from stealing the session cookie via document.cookie
        secure: process.env.NODE_ENV === "production",  // Not work unless on production only
        maxAge: 1000 * 60 * 60 * 24                     // Session lifetime = 24 hourse (in milliseconds)
    },
}));

// App Routes
app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/category", categoryRoutes);

// Handel for undefine routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`,
    });
});


// global error handling middleware (Must be last)
app.use(errorMiddleware);

module.exports = app;