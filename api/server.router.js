import express from 'express';

//create a new router instance
const serverRouter = express.Router();

// Define the route for getting station time data
serverRouter.route('/currentTime').get((req, res) => {
    // Get the current time
    const currentTime = new Date("2024-04-02").toISOString();
    
    // Send the current time as a response
    res.json({ currentTime });
});

// Export the server router
export default serverRouter;