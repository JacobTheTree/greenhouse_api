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

// Each station gets a fixed baseline offset so they don't all read the same
const stationBaselineOffsets = {};
stations.forEach((id, idx) => {
  stationBaselineOffsets[id] = {
    temperature:    (idx - 4.5) * 0.8,   // spread stations across ~±4°C
    humidity:       (idx - 4.5) * 2,
    soilMoisture:   (idx - 4.5) * 3,
    lightIntensity: (idx - 4.5) * 30
  };
});

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function gaussianNoise(stddev) {
  // Box-Muller transform for bell-curve noise instead of uniform
  const u1 = Math.random();
  const u2 = Math.random();
  return stddev * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function getTimeOfDayValue(hourFraction, sensor) {
  // Returns a 0-1 multiplier representing time-of-day patterns
  // hourFraction: 0-24
  switch (sensor) {
    case "temperature":
      // peaks ~14:00, lowest ~05:00
      return 0.5 + 0.5 * Math.sin((hourFraction - 8) * Math.PI / 12);
    case "humidity":
      // inverse of temperature — high at night, low in afternoon
      return 0.5 - 0.4 * Math.sin((hourFraction - 8) * Math.PI / 12);
    case "soilMoisture":
      // slow drift, slightly lower in afternoon heat
      return 0.5 - 0.15 * Math.sin((hourFraction - 8) * Math.PI / 12);
    case "lightIntensity":
      // zero at night, bell curve during day peaking at noon
      if (hourFraction < 6 || hourFraction > 20) return 0;
      return Math.sin((hourFraction - 6) * Math.PI / 14);
    default:
      return 0.5;
  }
}

function generateReading(sensor, hourFraction, stationId) {
  const range = sensorRanges[sensor];
  const span = range.max - range.min;

  // Time-of-day curve sets the base (0-1 mapped to the range)
  const todFactor = getTimeOfDayValue(hourFraction, sensor);
  const base = range.min + todFactor * span;

  // Station offset gives each station its own personality
  const offset = stationBaselineOffsets[stationId][sensor] || 0;

  // Small gaussian noise for natural jitter
  const noise = gaussianNoise(span * 0.03);

  return parseFloat(clamp(base + offset + noise, range.min, range.max).toFixed(2));
}

function getSensorsForStation(stationId) {
  if (stationId === "station_09") return ["temperature", "humidity"];
  if (stationId === "station_10") return ["temperature", "humidity", "lightIntensity"];
  return ["temperature", "humidity", "soilMoisture", "lightIntensity"];
}

const readings = [];
const now = new Date();

for (const stationId of stations) {
  const sensorKeys = getSensorsForStation(stationId);

  for (let i = 0; i < 288*7; i++) {
    const timestamp = new Date(now - i * 5 * 60 * 1000);
    const hourFraction = timestamp.getUTCHours() + timestamp.getUTCMinutes() / 60;

    const sensors = {};
    for (const key of sensorKeys) {
      sensors[key] = generateReading(key, hourFraction, stationId);
    }

    readings.push({
      stationId,
      timestamp,
      sensors,
      readingType: "scheduled",
      flag: null
    });
  }
}

db.sensor_readings.insertMany(readings);
print(`Inserted ${readings.length} readings`);

print("Database initialized successfully");