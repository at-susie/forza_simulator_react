const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const dgram = require('dgram');

// our localhost port
const port = 5000;
const app = express();

// Create an UDO Connection to the XBOX
const udp = dgram.createSocket('udp6');

let clients = new Map();

udp.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

udp.on('message', (msg, rinfo) => {
  var str = readStream(msg);

  for (const [sequenceNumber, client] of clients.entries()) {
    client.emit("datastream", str);
  }

});

udp.on('listening', () => {
  const address = udp.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

udp.bind(7777);

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

// this should be only be called once per connection.
io.on('connection', socket => {

  console.info(`Client connected [id=${socket.id}]`);

  clients.set(socket.id, socket);
  socket.emit('connect', 'connected as ' + socket.id);

  // Button click
  socket.on('clickbutton_prev_in', msg => {
    io.emit('clickbutton_prev_out', msg);
  });

  socket.on('clickbutton_next_in', msg => {
    io.emit('clickbutton_next_out', msg);
  });

  socket.on('clickbutton_up_in', msg => {
    io.emit('clickbutton_up_out', msg);
  });

  socket.on('clickbutton_down_in', msg => {
    io.emit('clickbutton_down_out', msg);
  });

  // Swipe
  socket.on('twofinger_swipe_in', direction => {
    io.emit('twofinger_swipe_out', direction);
    console.log("Two finger swipe", direction);
  });

  socket.on('onefinger_swipe_in', direction => {
    io.emit('onefinger_swipe_out', direction);
    console.log("One finger swipe", direction);
  });

  // Swipe 2nd step
  socket.on('communication_top_in', direction => {
    io.emit('communication_top_out', direction);
  });

  socket.on('media_top_in', direction => {
    io.emit('media_top_out', direction);
  });

  socket.on('settings_top_in', direction => {
    io.emit('settings_top_out', direction);
  });

  socket.on('communication_bottom_in', direction => {
    io.emit('communication_bottom_out', direction);
  });

  socket.on('media_bottom_in', direction => {
    io.emit('media_bottom_out', direction);
  });

  socket.on('settings_bottom_in', direction => {
    io.emit('settings_bottom_out', direction);
  });

  socket.on('viewmode_change_in', viewmode => {
    io.emit('viewmode_change_out', viewmode);
  });

  socket.on('toggle_in', toggle => {
    io.emit('toggle_out', toggle);
  });

  // when socket disconnects, remove it from the list:
  socket.on("disconnect", () => {
    clients.delete(socket.id);
    console.info(`Client gone [id=${socket.id}]`);
  });

})

server.listen(port, () => console.log(`Listening on port ${port}`));

function readStream(data) {

  let reader = Buffer.from(data);

  let object = new Object();

  // SLED

  object.IsRaceOn = reader.readInt32LE();
  object.TimestampMS = reader.readInt32LE(4);

  object.EngineMaxRpm = reader.readFloatLE(8);
  object.EngineIdleRpm = reader.readFloatLE(12);
  object.CurrentEngineRpm = reader.readFloatLE(16);

  object.AccelerationX = reader.readFloatLE(20);
  object.AccelerationY = reader.readFloatLE(24);
  object.AccelerationZ = reader.readFloatLE(28);

  object.VelocityX = reader.readFloatLE(32);
  object.VelocityY = reader.readFloatLE(36);
  object.VelocityZ = reader.readFloatLE(40);

  object.AngularVelocityX = reader.readFloatLE(44);
  object.AngularVelocityY = reader.readFloatLE(48);
  object.AngularVelocityZ = reader.readFloatLE(52);

  object.Yaw = reader.readFloatLE(56);
  object.Pitch = reader.readFloatLE(60);
  object.Roll = reader.readFloatLE(64);

  object.NormalizedSuspensionTravelFrontLeft = reader.readFloatLE(68);
  object.NormalizedSuspensionTravelFrontRight = reader.readFloatLE(72);
  object.NormalizedSuspensionTravelRearLeft = reader.readFloatLE(76);
  object.NormalizedSuspensionTravelRearRight = reader.readFloatLE(80);

  object.TireSlipRatioFrontLeft = reader.readFloatLE(84);
  object.TireSlipRatioFrontRight = reader.readFloatLE(88);
  object.TireSlipRatioRearLeft = reader.readFloatLE(92);
  object.TireSlipRatioRearRight = reader.readFloatLE(96);

  object.WheelRotationSpeedFrontLeft = reader.readFloatLE(100);
  object.WheelRotationSpeedFrontRight = reader.readFloatLE(104);
  object.WheelRotationSpeedRearLeft = reader.readFloatLE(108);
  object.WheelRotationSpeedRearRight = reader.readFloatLE(112);

  object.WheelOnRumbleStripFrontLeft = reader.readInt32LE(116);
  object.WheelOnRumbleStripFrontRight = reader.readInt32LE(120);
  object.WheelOnRumbleStripRearLeft = reader.readInt32LE(124);
  object.WheelOnRumbleStripRearRight = reader.readInt32LE(128);

  object.WheelInPuddleDepthFrontLeft = reader.readFloatLE(132);
  object.WheelInPuddleDepthFrontRight = reader.readFloatLE(136);
  object.WheelInPuddleDepthRearLeft = reader.readFloatLE(140);
  object.WheelInPuddleDepthRearRight = reader.readFloatLE(144);

  object.SurfaceRumbleFrontLeft = reader.readFloatLE(148);
  object.SurfaceRumbleFrontRight = reader.readFloatLE(152);
  object.SurfaceRumbleRearLeft = reader.readFloatLE(156);
  object.SurfaceRumbleRearRight = reader.readFloatLE(160);

  object.TireSlipAngleFrontLeft = reader.readFloatLE(164);
  object.TireSlipAngleFrontRight = reader.readFloatLE(168);
  object.TireSlipAngleRearLeft = reader.readFloatLE(172);
  object.TireSlipAngleRearRight = reader.readFloatLE(176);

  object.TireCombinedSlipFrontLeft = reader.readFloatLE(180);
  object.TireCombinedSlipFrontRight = reader.readFloatLE(184);
  object.TireCombinedSlipRearLeft = reader.readFloatLE(188);
  object.TireCombinedSlipRearRight = reader.readFloatLE(192);

  object.SuspensionTravelMetersFrontLeft = reader.readFloatLE(196);
  object.SuspensionTravelMetersFrontRight = reader.readFloatLE(200);
  object.SuspensionTravelMetersRearLeft = reader.readFloatLE(204);
  object.SuspensionTravelMetersRearRight = reader.readFloatLE(208);

  object.CarOrdinal = reader.readInt32LE(212);
  object.CarClass = reader.readInt32LE(216);
  object.CarPerformanceIndex = reader.readInt32LE(220);
  object.DrivetrainType = reader.readInt32LE(224);
  object.NumCylinders = reader.readInt32LE(228);

  // DASH

  // object.PositionX = reader.readFloatLE(232);
  // object.PositionY = reader.readFloatLE(236);
  // object.PositionZ = reader.readFloatLE(240);

  // object.Speed = reader.readFloatLE(244);
  // object.Power = reader.readFloatLE(248);
  // object.Torque = reader.readFloatLE(252);

  // object.TireTempFrontLeft = reader.readFloatLE(256);
  // object.TireTempFrontRight = reader.readFloatLE(260);
  // object.TireTempRearLeft = reader.readFloatLE(264);
  // object.TireTempRearRight = reader.readFloatLE(268);

  // object.Boost = reader.readFloatLE(272);
  // object.Fuel = reader.readFloatLE(276);
  // object.DistanceTraveled = reader.readFloatLE(280);
  // object.BestLap = reader.readFloatLE(284);
  // object.LastLap = reader.readFloatLE(288);
  // object.CurrentLap = reader.readFloatLE(292);
  // object.CurrentRaceTime = reader.readFloatLE(296);

  // object.LapNumber = reader.readUInt16LE(300);
  // object.RacePosition = reader.readUInt8(302);

  // object.Accel = reader.readUInt8(303);
  // object.Brake = reader.readUInt8(304);
  // object.Clutch = reader.readUInt8(305);
  // object.HandBrake = reader.readUInt8(306);
  // object.Gear = reader.readUInt8(307);
  // object.Steer = reader.readInt8(308);

  // object.NormalizedDrivingLine = reader.readInt8(309);
  // object.NormalizedAIBrakeDifference = reader.readInt8(310);

  // Horizon DASH

  object.PositionX = reader.readFloatLE(244);
  object.PositionY = reader.readFloatLE(248);
  object.PositionZ = reader.readFloatLE(252);

  object.Speed = reader.readFloatLE(256);
  object.Power = reader.readFloatLE(260);
  object.Torque = reader.readFloatLE(264);

  object.TireTempFrontLeft = reader.readFloatLE(268);
  object.TireTempFrontRight = reader.readFloatLE(272);
  object.TireTempRearLeft = reader.readFloatLE(276);
  object.TireTempRearRight = reader.readFloatLE(280);

  object.Boost = reader.readFloatLE(284);
  object.Fuel = reader.readFloatLE(288);
  object.DistanceTraveled = reader.readFloatLE(292);
  object.BestLap = reader.readFloatLE(296);
  object.LastLap = reader.readFloatLE(300);
  object.CurrentLap = reader.readFloatLE(304);
  object.CurrentRaceTime = reader.readFloatLE(308);

  object.LapNumber = reader.readUInt16LE(312);
  object.RacePosition = reader.readUInt8(314);

  object.Accel = reader.readUInt8(315);
  object.Brake = reader.readUInt8(316);
  object.Clutch = reader.readUInt8(317);
  object.HandBrake = reader.readUInt8(318);
  object.Gear = reader.readUInt8(319);
  object.Steer = reader.readInt8(320);

  object.NormalizedDrivingLine = reader.readInt8(321);
  object.NormalizedAIBrakeDifference = reader.readInt8(322);

  object.Season = reader.readInt8(323);

  // console.log(object.Speed * 3.6 / 1.6);

  return object;

}