db = db.getSiblingDB("greenhouse_db");

// Create stations collection
db.createCollection("stations");
db.stations.createIndex({ deviceId: 1 }, { unique: true });
db.stations.createIndex({ setId: 1 });

// Create sensor_readings collection
db.createCollection("sensor_readings");
db.sensor_readings.createIndex({ deviceId: 1, timestamp: -1 });
db.sensor_readings.createIndex({ timestamp: -1 });

// Seed some initial station data
db.stations.insertMany([
  {
    deviceId: "station_01",
    setId: "set_A",
    location: "greenhouse_north",
    sensors: ["temperature", "humidity", "soilMoisture"],
    metadata: {
      firmwareVersion: "1.2.0",
      batteryLevel: 100
    },
    createdAt: new Date()
  },
  {
    deviceId: "station_02",
    setId: "set_A",
    location: "greenhouse_south",
    sensors: ["temperature", "humidity", "light"],
    metadata: {
      firmwareVersion: "1.2.0",
      batteryLevel: 100
    },
    createdAt: new Date()
  }
]);

print("Database initialized successfully");