#!/usr/bin/env ruby
require 'rubygems'
require 'sinatra'

before do
  response.headers['X-Backend'] = "Sinatra example_backend.rb"
end

get "/cache_headers" do
  response.headers['Content-Type'] = "application/json"
  response.headers['Cache-Control'] = "public; max-age=100"
  %|{ "key1": "value1", "key2": "value2" }|
end
