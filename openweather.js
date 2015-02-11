// Generated by CoffeeScript 1.8.0
(function() {
  var buildPath, def, getWeather, http, imgPath, opts;

  http = require('http');

  opts = {
    hostname: 'api.openweathermap.org',
    port: 80,
    withCredentials: false
  };

  imgPath = 'http://openweathermap.org/img/w/';

  def = '';

  exports.defaults = function(cfg) {
    var i, n, objs;
    objs = [];
    for (i in cfg) {
      n = cfg[i];
      objs.push("" + i + "=" + n);
    }
    return def = objs.join('&');
  };

  exports.opts = function(optsIn) {
    var i, n;
    if (optsIn == null) {
      optsIn = {};
    }
    for (i in optsIn) {
      n = optsIn[i];
      opts[i] = optsIn[i];
    }
    return this;
  };

  exports.find = function(cfg, cb) {
    opts.path = "/data/2.5/find?" + (buildPath(cfg));
    return getWeather(opts, function(json) {
      var item, _i, _len, _ref;
      _ref = json.list;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        item.weather[0].iconUrl = "" + imgPath + item.weather[0].icon + ".png";
      }
      return cb(json);
    });
  };

  exports.now = function(cfg, cb) {
    opts.path = "/data/2.5/weather?" + (buildPath(cfg));
    return getWeather(opts, function(json) {
      if (200 === Number(json.cod)) {
        json.weather[0].iconUrl = "" + imgPath + json.weather[0].icon + ".png";
      }
      return cb(json);
    });
  };

  exports.forecast = function(cfg, cb) {
    opts.path = "/data/2.5/forecast?" + (buildPath(cfg));
    return getWeather(opts, function(json) {
      var item, _i, _len, _ref;
      _ref = json.list;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        item.weather[0].iconUrl = "" + imgPath + item.weather[0].icon + ".png";
      }
      return cb(json);
    });
  };

  exports.daily = function(cfg, cb) {
    opts.path = "/data/2.5/forecast/daily?" + (buildPath(cfg));
    return getWeather(opts, function(json) {
      var item, _i, _len, _ref;
      _ref = json.list;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        item.weather[0].iconUrl = "" + imgPath + item.weather[0].icon + ".png";
      }
      return cb(json);
    });
  };

  exports.history = function(cfg, cb) {
    opts.path = "/data/2.5/history/city?" + (buildPath(cfg));
    return getWeather(opts, function(json) {
      var item, _i, _len, _ref;
      _ref = json.list;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        item.weather[0].iconUrl = "" + imgPath + item.weather[0].icon + ".png";
      }
      return cb(json);
    });
  };

  buildPath = function(cfg) {
    var i, n, objs;
    objs = [];
    for (i in cfg) {
      n = cfg[i];
      objs.push("" + i + "=" + n);
    }
    return "" + def + "&" + (objs.join('&'));
  };

  getWeather = function(opts, cb) {
    return http.get(opts, function(res) {
      var buffer;
      buffer = '';
      res.on('data', function(data) {
        return buffer += data;
      });
      return res.on('end', function() {
        var json;
        json = {
          cod: '500'
        };
        try {
          json = JSON.parse(buffer);
        } catch (_error) {}
        if (json.list == null) {
          json.list = [];
        }
        return cb(json);
      });
    });
  };

}).call(this);
