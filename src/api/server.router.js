import express from 'express';

//create a new router instance
const serverRouter = express.Router();

// Define the route for getting station time data
serverRouter.route('/currentTime').get((req, res) => {
    // Get the current time
    const currentTime = new Date().toISOString();
    
    // Send the current time as a response
    res.json({ currentTime });
});

// Define a route for getting server status
serverRouter.route('/status').get((req, res) => {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    const currentTime = new Date().toISOString();

    res.json({
        status: 'Server is running',
        uptime: `${Math.floor(uptime)} seconds`,
        memoryUsage: {
            rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
            heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
            heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
            external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`
        },
        currentTime
    });
});

// Define a route for 

// Export the server router
export default serverRouter;