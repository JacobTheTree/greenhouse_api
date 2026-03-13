import express from "express";
import StationController from "./station.controller.js";

const stationRouter = express.Router();
// Routes for station
// Define the route for posting and getting station data
stationRouter.route("/station/:stationId/data")
.post((req, res) => {
    StationController.postData(req, res);
})
.get((req, res) => {
    StationController.getStationTimeData(req, res);
});

// Define the route for updating and getting station metadata
stationRouter.route("/station/:stationId/metadata")
.get((req, res) => {
    StationController.getStationMetadata(req, res);
})
.put((req, res) => {
    StationController.updateStationMetadata(req, res);
});

// Define the route for getting station metrics
stationRouter.route("/station/:stationId/metrics").get((req, res) => {
    StationController.getStationMetrics(req, res);
});

// Routes for groups
// Define route for getting group data
stationRouter.route("/group/:groupId/data").get((req, res) => {
    StationController.getGroupData(req, res);
});

// Define route for getting group metadata
stationRouter.route("/group/:groupId/metadata").get((req, res) => {
    StationController.getGroupMetadata(req, res);
});

//Define route for getting group metrics
stationRouter.route("/group/:groupId/metrics").get((req, res) => {
    StationController.getGroupMetrics(req, res);
});


export default stationRouter;