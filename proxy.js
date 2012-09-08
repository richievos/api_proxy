var httpProxy = require('http-proxy'),
    sets = require('simplesets')
    url = require('url'),
    util = require('util');

var ResponseFilter = {
  responder: function(request, response, next) {
    util.puts("In responder");
    var _write = response.write;

    response.write = function(data) {
      var dataString = data.toString();
      if (dataString.length > 0) {
        var dataJSON = JSON.parse(dataString);

        if (dataJSON) {
          var urlParts = url.parse(request.url, true);
          var query = urlParts.query;

          var filter = ResponseFilter.parseFilterParams(query['fields']);

          if (filter) {
            _write.call(response, JSON.stringify(filter.filter(dataJSON)));
          } else {
            _write.call(response, data);
          }
        }
      }
    }

    next();
  },

  parseFilterParams: function(filterString) {
    if (filterString && filterString.length != 0) {
      return new ResponseFilter.Filterer(new sets.Set(filterString.split(',')));
    } else {
      return null;
    }
  },

  Filterer: function(keys) {
    this.keys = keys;

    this.filter = function(baseHash) {
      if (!baseHash) return null;

      var result = {};
      for (var field in baseHash) {
        if (keys.has(field)) {
          result[field] = baseHash[field];
        }
      }

      return result;
    }
  }
};


function parseProxyOptions(mappings) {
  // proxyOptions ends up looking like:
  // var proxyOptions = {
  //   router: {
  //     'ruby': 'localhost:8001',
  //     'node': 'localhost:8002'
  //   }
  // };
  var proxyOptions = { router: {} };

  var mappingSets = JSON.parse(mappings);

  for (var host in mappingSets) {
    proxyOptions.router[host] = "localhost:" + mappingSets[host];
  }

  return parseProxyOptions;
}

var proxyPort = parseInt(process.argv[2] || 9000);
var mappings = process.argv[3] || '{ "ruby": 9010, "node": 9030 }';

var proxyOptions = parseProxyOptions(mappings);

util.puts("HTTP proxy server started on port " + proxyPort + ".\nRouting table:");
util.puts(util.inspect(proxyOptions));

//
// Basic Http Proxy Server
//
httpProxy.createServer(ResponseFilter.responder, options).listen(proxyPort);