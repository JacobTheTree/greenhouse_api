let station
let stationMetadata

export default class stationDAO{
    static async injectDB(conn){
        if(station && stationMetadata){
            return
        }
        try{
            station = await conn.db(process.env.DB_NAME).collection(process.env.DB_DATA_COLLECTION);
            stationMetadata = await conn.db(process.env.DB_NAME).collection(process.env.DB_STATION_COLLECTION);
        }
        catch(error){
            console.error(`Unable to establish collection handles in stationDAO: ${error}`)
        }
    }
    static async getStationData(stationId, timeStart, timeEnd) {
        //validate inputs
        if(!stationId) {
            console.error("stationId is required");
            return { error: "stationId is required" };
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
            stationId: stationId,
            timestamp: {
                $gt: startDate,
                $lt: endDate
            }
        };

        console.log(`Querying station data with query: ${JSON.stringify(query)}`);
        try {
            const cursor = await station.find(query);
            const results = await cursor.toArray();
            return results;
        } catch (error) {
            console.error(`Unable to retrieve station time data: ${error}`);
            return { error: "Unable to retrieve station time data" };
        }
    }
    static async getStationMetrics(stationId) {
        if (!stationId) {
            console.error(`Station ID is required`);
            return({error: "StationId required"});
        }
        try {
            const query = { stationId: stationId };
            const stationMetrics = await station.findOne(query, { projection: { _id: 0, stationId: 1 } });
            if (!stationMetrics) {
                console.error(`Station with stationId ${stationId} not found`);
                return({ error: "Station not found" });
            }
            return stationMetrics.stationId || {};
        } catch (error) {
            console.error(`Unable to retrieve station metrics: ${error}`);
            return({ error: "Unable to retrieve station metrics" });
        }
    }
    static async getStationMetadata(stationId) {
        if (!stationId) {
            console.error(`Station ID is required`);
            return({error: "StationId required"});
        }
        try {
            const query = { stationId: stationId };
            const Metadata = await stationMetadata.findOne(query);
            if (!Metadata) {
                console.error(`Station with stationId ${stationId} not found`);
                return({ error: "Station not found" });
            }
            return Metadata || {};
        } catch (error) {
            console.error(`Unable to retrieve station metadata: ${error}`);
            return({ error: "Unable to retrieve station metadata" });
        }
    }
    static async updateStationMetadata(stationId, metadata) {
        if (!stationId) {
            console.error(`Station ID is required`);
            return({error: "StationId required"});
        }
        try {
            const query = { stationId: stationId };
            const update = { 
                $set: metadata,
                $currentDate: { updatedAt: true }
            };
            const result = await stationMetadata.findOneAndUpdate(query, update);
            console.log(result);
            if (!result) {
                console.error(`Station with stationId ${stationId} not found`);
                return({ error: "Station not found" });
            }
            return { status: "success" };
        } catch (error) {
            console.error(`Unable to update station metadata: ${error}`);
            return({ error: "Unable to update station metadata" });
        }
    }
    static async postData(stationId, stationData) {
        if (!stationId) {
            console.error(`Station ID is required`);
            return {error: "StationId required"};
        }
        if (!stationData || typeof stationData !== 'object') {
            console.error(`Valid station data is required`);
            return {error: "Valid station data required"};
        }
        const { sensorData, readingType } = stationData.stationData ?? stationData.readingType;
        const data = {
            "stationId": stationId,
            "timestamp": new Date(),
            "sensors": sensorData,
            "readingType": readingType,
            "flag": null
        };

        try {
            const doc = data;
            console.log(doc);

            const result = await station.insertOne(doc);
            if (!result) {
                throw new Error('Station not found');
            }
            console.log(result);
            return { status: "success" };

        }catch(error){
        console.error(`Unable to add data: ${error}`);
        return {error: error};
        }
    }
    static async getGroupData(groupId, timeStart, timeEnd) {
        if (!groupId) {
            console.error(`Group ID is required`);
            return({error: "GroupId required"});
        }
        try {
            const query = { groupId: groupId };
            const options = { projection: { _id: 0, stationId: 1} };
            const stationIdInGroup = await stationMetadata.find(query, options).toArray();
            if (!stationIdInGroup || stationIdInGroup.length === 0) {
                console.error(`Group with groupId ${groupId} not found`);
                return({ error: "Group not found" });
            }
            console.log(stationIdInGroup);
            const groupData = { groupId: groupId, stations: [stationIdInGroup], data: [] };
            for (let i = 0; i < stationIdInGroup.length; i++) {
                const stationId = stationIdInGroup[i].stationId;
                const stationData = await stationDAO.getStationData(stationId, timeStart, timeEnd);
                if (stationData.error) {
                    console.error(`Unable to retrieve data for station ${stationId}: ${stationData.error}`);
                    continue;
                }
                groupData.data.push({ stationId: stationId, data: stationData });
            }
            return groupData || {};
        } catch (error) {
            console.error(`Unable to retrieve group data: ${error}`);
            return({ error: "Unable to retrieve group data" });
        }
    }
    static async getGroupMetadata(groupId) {
        if (!groupId) {
            console.error(`Group ID is required`);
            return({error: "GroupId required"});
        }
        try {
            const query = { groupId: groupId };
            const options = { projection: { _id: 0, stationId: 1} };
            const stationIdInGroup = await stationMetadata.find(query, options).toArray();
            if (!stationIdInGroup || stationIdInGroup.length === 0) {
                console.error(`Group with groupId ${groupId} not found`);
                return({ error: "Group not found" });
            }
            console.log(stationIdInGroup);
            const groupData = { groupId: groupId, stations: [stationIdInGroup], data: [] };
            for (let i = 0; i < stationIdInGroup.length; i++) {
                const stationId = stationIdInGroup[i].stationId;
                const stationData = await stationDAO.getStationMetadata(stationId);
                if (stationData.error) {
                    console.error(`Unable to retrieve data for station ${stationId}: ${stationData.error}`);
                    continue;
                }
                groupData.data.push({ stationId: stationId, data: stationData });
            }
            return groupData || {};
        } catch (error) {
            console.error(`Unable to retrieve group data: ${error}`);
            return({ error: "Unable to retrieve group data" });
        }
    }
    static async getGroupMetrics(groupId) {
        if (!groupId) {
            console.error(`Group ID is required`);
            return({error: "GroupId required"});
        }
        try {
            const query = { groupId: groupId };
            const options = { projection: { _id: 0, stationId: 1} };
            const stationIdInGroup = await stationMetadata.find(query, options).toArray();
            if (!stationIdInGroup || stationIdInGroup.length === 0) {
                console.error(`Group with groupId ${groupId} not found`);
                return({ error: "Group not found" });
            }
            console.log(stationIdInGroup);
            const groupData = { groupId: groupId, stations: [stationIdInGroup], data: [] };
            for (let i = 0; i < stationIdInGroup.length; i++) {
                const stationId = stationIdInGroup[i].stationId;
                const stationData = await stationDAO.getStationMetrics(stationId);
                if (stationData.error) {
                    console.error(`Unable to retrieve data for station ${stationId}: ${stationData.error}`);
                    continue;
                }
                groupData.data.push({ stationId: stationId, data: stationData });
            }
            return groupData || {};
        } catch (error) {
            console.error(`Unable to retrieve group data: ${error}`);
            return({ error: "Unable to retrieve group data" });
        }
    }
}