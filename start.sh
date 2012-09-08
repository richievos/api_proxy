#!/bin/sh
echo "Port mappings
Sinatra Backend: 9010
Node Backend: 9030

Proxy: 9000
"

ruby sinatra_backend.rb -p 9010 &
node node_backend.js 9030 &

node proxy.js 9000 '{ "ruby": 9010, "node": 9030 }' &