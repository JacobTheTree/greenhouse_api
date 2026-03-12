import express from "express";
import StationController from "./station.controller.js";

const stationRouter = express.Router();

stationRouter.route("/data/history").get(StationController.apiGetStationTimeData);

export default stationRouter;