var util = require('util'),
    httpProxy = require('http-proxy');

var proxy_port = process.argv[2] || 9000;

var mappings = process.argv[3] || '{ "ruby": 9010, "node": 9030 }';

// var options = {
//   router: {
//     'foo.com/baz': '127.0.0.1:8001',
//     'bar.com/buz': '127.0.0.1:8003'
//   }
// };

var options = {
  router: {}
};

var mapping_sets = JSON.parse(mappings);

for (var host in mapping_sets) {
  options.router[host] = "localhost:" + mapping_sets[host];
}

util.puts("HTTP proxy server started on port " + proxy_port + ".\nRouting table:");
util.puts(util.inspect(options));

//
// Basic Http Proxy Server
//
httpProxy.createServer(options).listen(parseInt(proxy_port));