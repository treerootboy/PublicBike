var React = require('react');
var StationSelector = require('./StationSelector.js');
module.exports = React.createClass({
	isLoadMarkers: false,
	getInitialState: function() {
		return {
			map: {},
			station: {
				lng: 121.491,
				lat: 31.233
			}
		};
	},
	componentDidMount: function() {
		var map = new BMap.Map('map');
		map.addEventListener("tilesloaded", (function(){
			// Mark down all stations
			this.setMarkers();
		}).bind(this));
		map.enableScrollWheelZoom(true);
		map.setCurrentCity('深圳');
		this.setState({map: map});
	},
	componentDidUpdate: function(prevProps, prevState) {
		(new BMap.Geolocation()).getCurrentPosition((function(geo){
			this.state.map.centerAndZoom(geo.point, 15);
			this.state.map.addOverlay(new BMap.Circle(geo.point, 20));
		}).bind(this));

		// move map to the selected station
		if (this.state.station !== prevState.station) {
			this.state.map.centerAndZoom(new BMap.Point(this.state.station.lng, this.state.station.lat), 18);
		}
	},
	setMarkers: function() {
		if (!this.isLoadMarkers && this.state.map) {
			this.state.map.clearOverlays();
			var points = [];
			Stations.map((v, i)=>{
				var point = new BMap.Point(v.station.lng, v.station.lat);
				var marker = new BMap.Marker(point);
				var label = new BMap.Label(v.station.name,{offset:new BMap.Size(20,-10)});
				marker.setLabel(label);
				marker.addEventListener("click", (function(){
					this.setStation(v);
				}).bind(this));
				this.state.map.addOverlay(marker);
			});
			this.isLoadMarkers = true;
		}
	},
	setStation(v){
		Api.url(v.station.fddmz).fetch((function(data){
			var station = data.station;
			if (this.isMounted()) {
				this.setState({station:station});
			}
		}).bind(this));
	},
	render() {
		return (
			<div>
			<StationSelector onSelect={this.setStation}/>
			<span>可借：{this.state.station.canborrow}, 空位：{this.state.station.empty}</span>
			<div id="map" style={{position: 'absolute', top:0, left:0, width: $(global).width(), height: $(global).height()}}></div>
			</div>
		);
	}
});