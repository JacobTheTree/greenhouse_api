import stationDAO from "../dao/stationDAO.js";

export default class StationController {
    // Function to get station data based on time range
    static async getStationData(req, res, next) {
        try {
            const stationId = req.params.stationId;
            const timeStart = req.query.timeStart;
            const timeEnd = req.query.timeEnd;
            console.log(req.query);
            const stationData = await stationDAO.getStationData(stationId, timeStart, timeEnd);

            if (stationData.error) {
                res.status(400).json({ error: stationData.error });
                return;
            }

            res.json(stationData);
        } catch (error) {
            console.error(`Unable to get station data: ${error}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    // Function to get station metrics
    static async getStationMetrics(req, res, next) {
        try {
            const stationId = req.params.stationId;
            console.log(req.query);
            const stationMetrics = await stationDAO.getStationMetrics(stationId);

            if (stationMetrics.error) {
                res.status(400).json({ error: stationMetrics.error });
                return;
            }

            res.json(stationMetrics);
        } catch (error) {
            console.error(`Unable to get station metrics: ${error}`);
            res.status(500).json({error: "Internal Server Error"});
        }
    }
    // Function to get station metadata
    static async getStationMetadata(req, res, next) {
        try {
            const stationId = req.params.stationId
            const stationMetadata = await stationDAO.getStationMetadata(stationId)

            if (stationMetadata.error) {
                res.status(400).json({ error: stationMetadata.error });
                return;
            }

            res.json(stationMetadata);
        } catch (error) {
            console.error(`Unable to get station metadata: ${error}`);
            res.status(500).json({error: "Internal Server Error"});
        }
    }
    // Function to update station metadata
    static async updateStationMetadata(req, res, next) {
        try {
            console.log(req.body);
            const stationId = req.params.stationId
            const metadata = req.body
            const updateResult = await stationDAO.updateStationMetadata(stationId, metadata)

            if (updateResult.error) {
                res.status(400).json({ error: updateResult.error });
                return;
            }

            res.json({ message: "Station metadata updated successfully" });
        } catch (error) {
            console.error(`Unable to update station metadata: ${error}`);
            res.status(500).json({error: "Internal Server Error"});
        }
    }
    // Function to post station data
    static async postData(req, res, next) {
        try {
            const stationId = req.params.stationId
            const stationData = req.body

            console.log(`Received data for station ${stationId}:`, stationData);
            stationDAO.postData(stationId, stationData);

            res.status(200).json({ message: "Station data received successfully" });

        } catch (e) {
            console.error(`Unable to post station data: ${e}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    // Function to get group data
    static async getGroupData(req, res, next) {
        try {
            const groupId = req.params.groupId;
            const timeStart = req.query.timeStart;
            const timeEnd = req.query.timeEnd;
            console.log(req.query);
            const groupData = await stationDAO.getGroupData(groupId, timeStart, timeEnd);

            if (groupData.error) {
                res.status(400).json({ error: groupData.error });
                return;
            }

            res.json(groupData);
        } catch (error) {
            console.error(`Unable to get group data: ${error}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    // Function to get group metadata
    static async getGroupMetadata(req, res, next) {
        try {
            const groupId = req.params.groupId
            const groupMetadata = await stationDAO.getGroupMetadata(groupId)

            if (groupMetadata.error) {
                res.status(400).json({ error: groupMetadata.error });
                return;
            }

            res.json(groupMetadata);
        } catch (error) {
            console.error(`Unable to get group metadata: ${error}`);
            res.status(500).json({error: "Internal Server Error"});
        }
    }
     // Function to get group metrics
     static async getGroupMetrics(req, res, next) {
        try {
            const groupId = req.params.groupId;
            console.log(req.query);
            const groupMetrics = await stationDAO.getGroupMetrics(groupId);

            if (groupMetrics.error) {
                res.status(400).json({ error: groupMetrics.error });
                return;
            }

            res.json(groupMetrics);
        } catch (error) {
            console.error(`Unable to get group metrics: ${error}`);
            res.status(500).json({error: "Internal Server Error"});
        }
    }  
}