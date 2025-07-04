let station
export default class stationDAO{
    static async injectDB(conn){
        if(station){
            return
        }
        try{
            station = await conn.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION)
        }
        catch(error){
            console.error(`Unable to establish collection handles in stationDAO: ${e}`)
        }
    }
    static async getStationTimeData(deviceId, timeStart, timeEnd) {
        //validate inputs
        if(!deviceId) {
            console.error("deviceId is required");
            return { error: "deviceId is required" };
        }

        if(!timeStart || !timeEnd) {
            console.error("Both timeStart and timeEnd are required");
            return { error: "Both timeStart and timeEnd are required" };
        }

        //convert timeStart and timeEnd to Date objects
        const startDate = new Date(timeStart);
        const endDate = new Date(timeEnd);

        //validate date objects
        if(isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.error("Invalid date format for timeStart or timeEnd");
            return { error: "Invalid date format for timeStart or timeEnd" };
        }
        if(startDate >= endDate) {
            console.error("timeStart must be before timeEnd");
            return { error: "timeStart must be before timeEnd" };
        }

        //Build the query
        const query = {
            deviceId: deviceId,
            timestamp: {
                $gt: startDate,
                $lt: endDate
            }
        };

        try {
            const cursor = await station.find(query);
            const results = await cursor.toArray();
            return results;
        } catch (error) {
            console.error(`Unable to retrieve station time data: ${error}`);
            return { error: "Unable to retrieve station time data" };
        }
    }
    static async getStationMetrics(deviceId) {
        if (!deviceId) {
            console.error(`Device ID is required`);
            return({error: "DeviceId required"});
        }
    }
}