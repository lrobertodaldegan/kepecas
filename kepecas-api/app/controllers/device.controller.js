const db = require("../models");
const Device = db.device;

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  'Ops!' });
    return;
  }
}

exports.userDevices = (req, res) => {
  let filter = {
    path:'user',
    match: {_id: req.userId}
  }
  
  Device.find({}).populate(filter).exec().then(devices => {
    if(!devices || devices.length < 1){
      res.status(404).send({message:`0 devices found!`});
    } else {
      res.status(200).send(devices); 
    }
  }).catch(err => errorHandler(err, res));
}

exports.deviceValidation = (req, res) => {
  let filter = {
    path:'user',
    match: {_id: req.userId}
  }
  
  Device.find({
    deviceId:req.body.deviceId
  }).populate(filter)
  .exec()
  .then(devices => {
    let body = {};

    if(!devices || devices.length < 1) {
      body = {valid:false, subscriptionOk: false};
    } else {
      let subOk = false;

      if(devices[0] && devices[0] !== null 
                    && devices[0].user 
                    && devices[0].user !== null) {
        subOk = devices[0].user.signature && devices[0].user.signature !== null;
      }

      body = {valid:true, subscriptionOk: subOk};
    }

    res.status(200).send(body); 
  }).catch(err => errorHandler(err, res));
}