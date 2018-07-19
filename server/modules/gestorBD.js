module.exports = {
  mongo: null,
  app: null,
  init: function(app, mongo) {
    this.mongo = mongo;
    this.app = app;
  },

  registerDevice: function(device, funcionCallback) {
    this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
      if (err) {
        funcionCallback(null);
      } else {
        var collection = db.collection('registered_devices');
        collection.insert(devices, function(err, result) {
          if (err) {
            funcionCallback(null);
          } else {
            funcionCallback(result.ops[0]._id);
          }
          db.close();
        });
      }
    });
  },

  getRegisteredDevices: function(criterio, funcionCallback) {
    this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
      if (err) {
        funcionCallback(null);
      } else {
        var collection = db.collection('registered_devices');
        collection.find(criterio)
          .toArray(function(err, devices) {
            if (err) {
              funcionCallback(null);
            } else {
              funcionCallback(devices);
            }
            db.close();
          });
      }
    });
  },

}