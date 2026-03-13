db = db.getSiblingDB("greenhouse_db");

// Create stations collection
db.createCollection("station_metadata");
db.station_metadata.createIndex({ stationId: 1 }, { unique: true });
db.station_metadata.createIndex({ groupId: 1 });

// Create sensor_readings collection
db.createCollection("sensor_readings");
db.sensor_readings.createIndex({ stationId: 1, timestamp: -1 });
db.sensor_readings.createIndex({ timestamp: -1 });

// Seed some initial station data
db.station_metadata.insertMany([
  // group_A — greenhouse north wing
  {
    stationId: "station_01",
    groupId: "group_A",
    location: { name: "greenhouse_north_01", zone: "north" },
    sensors: [
      { key: "temperature", unit: "celsius", type: "double" },
      { key: "humidity", unit: "percent", type: "double" },
      { key: "soilMoisture", unit: "percent", type: "double" },
      { key: "lightIntensity", unit: "lux", type: "double" }
    ],
    firmwareVersion: "0.1.0",
    apiVersion: "0.1.0",
    readingInterval: 300,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    stationId: "station_02",
    groupId: "group_A",
    location: { name: "greenhouse_north_02", zone: "north" },
    sensors: [
      { key: "temperature", unit: "celsius", type: "double" },
      { key: "humidity", unit: "percent", type: "double" },
      { key: "soilMoisture", unit: "percent", type: "double" },
      { key: "lightIntensity", unit: "lux", type: "double" }
    ],
    firmwareVersion: "0.1.0",
    apiVersion: "0.1.0",
    readingInterval: 300,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    stationId: "station_03",
    groupId: "group_A",
    location: { name: "greenhouse_north_03", zone: "north" },
    sensors: [
      { key: "temperature", unit: "celsius", type: "double" },
      { key: "humidity", unit: "percent", type: "double" },
      { key: "soilMoisture", unit: "percent", type: "double" },
      { key: "lightIntensity", unit: "lux", type: "double" }
    ],
    firmwareVersion: "0.1.0",
    apiVersion: "0.1.0",
    readingInterval: 300,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // group_B — greenhouse south wing
  {
    stationId: "station_04",
    groupId: "group_B",
    location: { name: "greenhouse_south_01", zone: "south" },
    sensors: [
      { key: "temperature", unit: "celsius", type: "double" },
      { key: "humidity", unit: "percent", type: "double" },
      { key: "soilMoisture", unit: "percent", type: "double" },
      { key: "lightIntensity", unit: "lux", type: "double" }
    ],
    firmwareVersion: "0.1.0",
    apiVersion: "0.1.0",
    readingInterval: 300,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    stationId: "station_05",
    groupId: "group_B",
    location: { name: "greenhouse_south_02", zone: "south" },
    sensors: [
      { key: "temperature", unit: "celsius", type: "double" },
      { key: "humidity", unit: "percent", type: "double" },
      { key: "soilMoisture", unit: "percent", type: "double" },
      { key: "lightIntensity", unit: "lux", type: "double" }
    ],
    firmwareVersion: "0.1.0",
    apiVersion: "0.1.0",
    readingInterval: 300,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    stationId: "station_06",
    groupId: "group_B",
    location: { name: "greenhouse_south_03", zone: "south" },
    sensors: [
      { key: "temperature", unit: "celsius", type: "double" },
      { key: "humidity", unit: "percent", type: "double" },
      { key: "soilMoisture", unit: "percent", type: "double" },
      { key: "lightIntensity", unit: "lux", type: "double" }
    ],
    firmwareVersion: "0.1.0",
    apiVersion: "0.1.0",
    readingInterval: 300,
    status: "inactive",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // group_C — outdoor beds
  {
    stationId: "station_07",
    groupId: "group_C",
    location: { name: "outdoor_bed_01", zone: "outdoor" },
    sensors: [
      { key: "temperature", unit: "celsius", type: "double" },
      { key: "humidity", unit: "percent", type: "double" },
      { key: "soilMoisture", unit: "percent", type: "double" },
      { key: "lightIntensity", unit: "lux", type: "double" }
    ],
    firmwareVersion: "0.1.0",
    apiVersion: "0.1.0",
    readingInterval: 600,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    stationId: "station_08",
    groupId: "group_C",
    location: { name: "outdoor_bed_02", zone: "outdoor" },
    sensors: [
      { key: "temperature", unit: "celsius", type: "double" },
      { key: "humidity", unit: "percent", type: "double" },
      { key: "soilMoisture", unit: "percent", type: "double" },
      { key: "lightIntensity", unit: "lux", type: "double" }
    ],
    firmwareVersion: "0.1.0",
    apiVersion: "0.1.0",
    readingInterval: 600,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // ungrouped — standalone stations
  {
    stationId: "station_09",
    groupId: null,
    location: { name: "storage_room", zone: "indoor" },
    sensors: [
      { key: "temperature", unit: "celsius", type: "double" },
      { key: "humidity", unit: "percent", type: "double" }
    ],
    firmwareVersion: "0.1.0",
    apiVersion: "0.1.0",
    readingInterval: 600,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    stationId: "station_10",
    groupId: null,
    location: { name: "propagation_room", zone: "indoor" },
    sensors: [
      { key: "temperature", unit: "celsius", type: "double" },
      { key: "humidity", unit: "percent", type: "double" },
      { key: "lightIntensity", unit: "lux", type: "double" }
    ],
    firmwareVersion: "0.1.0",
    apiVersion: "0.1.0",
    readingInterval: 300,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

const stations = [
  "station_01", "station_02", "station_03",
  "station_04", "station_05", "station_06",
  "station_07", "station_08", "station_09", "station_10"
];

const sensorRanges = {
  temperature:    { min: 18,  max: 30  },
  humidity:       { min: 40,  max: 90  },
  soilMoisture:   { min: 20,  max: 80  },
  lightIntensity: { min: 0,   max: 1000 }
};

function rand(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function getSensorsForStation(stationId) {
  // station_09 and 10 have fewer sensors
  if (stationId === "station_09") return ["temperature", "humidity"];
  if (stationId === "station_10") return ["temperature", "humidity", "lightIntensity"];
  return ["temperature", "humidity", "soilMoisture", "lightIntensity"];
}

const readings = [];
const now = new Date();

for (const stationId of stations) {
  const sensorKeys = getSensorsForStation(stationId);

  // generate 24 hours of readings at 5 min intervals = 288 readings per station
  for (let i = 0; i < 288; i++) {
    const sensors = {};
    for (const key of sensorKeys) {
      sensors[key] = rand(sensorRanges[key].min, sensorRanges[key].max);
    }

    readings.push({
      stationId,
      timestamp: new Date(now - i * 5 * 60 * 1000),
      sensors,
      readingType: "scheduled",
      flag: null
    });
  }
}

db.sensor_readings.insertMany(readings);
print(`Inserted ${readings.length} readings`);

print("Database initialized successfully");