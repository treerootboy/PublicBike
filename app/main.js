global.$ = require('jquery');
global.Api = require('./Api.js');
global.Stations = require('./Stations.js');

var ReactDOM = require('react-dom');
var React = require('react');
var AppComponent = require('./AppComponent.js');
ReactDOM.render(<AppComponent/>, document.getElementById('react-container'));