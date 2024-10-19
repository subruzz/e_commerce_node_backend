const express = require('express');
const mongoose = require('mongoose');
const authRouter=require('./routes/auth')
const cors = require('cors'); 

// Define the port number where the server will listen
const PORT = 3000;

// Creating an instance of express
const app = express();
app.use(cors());
// Correct MongoDB connection string
const DB = "mongodb+srv://subruzz4424:Subruzz44%40@cluster0.rqewg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json());
app.use(authRouter);
// Connect to MongoDB using mongoose
mongoose.connect(DB)
    .then(() => console.log('MONGO DB CONNECTED'))
    .catch((err) => console.error('MONGO DB CONNECTION ERROR:', err));

// Start the server and listen on the defined port
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
