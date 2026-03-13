import stationDAO from "../dao/stationDAO.js";

export default class StationController {
    static async apiGetStationTimeData(req, res, next) {
        try {
            const deviceID = req.query.deviceId;
            const timeStart = req.query.timeStart;
            const timeEnd = req.query.timeEnd;
            console.log(req.query);
            const stationData = await stationDAO.getStationTimeData(deviceID, timeStart, timeEnd);

            if (stationData.error) {
                res.status(400).json({ error: stationData.error });
                return;
            }

            res.json(stationData);
        } catch (e) {
            console.error(`Unable to get station data: ${e}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    static async apiGetStationMetrics(req, res, next) {
        try {
            const deviceID = req.query.deviceId;
            console.log(req.query);
        } catch (e) {
            console.error(`Unable to get station metrics: ${e}`);
            res.status(500).json({error: "Internal Server Error"});
        }
    }
    static async postStationData(req, res, next) {
        try {
            const stationId = req.params.stationId
            const stationData = req.body
            const data = {
                tempure: stationData.temperature,
                humidity: stationData.humidity,
                soilMoisture: stationData.soilMoisture,
                lightIntensity: stationData.lightIntensity,
                timestamp: new Date()
            }

            console.log(`Received data for station ${stationId}:`, stationData);
            addData(stationId, data);

            res.status(200).json({ message: "Station data received successfully" });

        } catch (e) {
            console.error(`Unable to post station data: ${e}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}