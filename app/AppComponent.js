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
	resetMapSize: function(){
		this.refs.map.style.width = $(global).width()+'px';
		this.refs.map.style.height = $(global).height()+'px';
	},
	componentDidMount: function() {
		var map = new BMap.Map('map');
		map.addEventListener("tilesloaded", (function(){
			// Mark down all stations
			this.setMarkers();
			this.setMyGeo();
		}).bind(this));
		map.setCurrentCity('深圳');
		map.centerAndZoom('罗湖', 15);

		global.addEventListener('resize', this.resetMapSize);
		this.setState({map: map});
	},
	componentDidUpdate: function(prevProps, prevState) {
		this.resetMapSize();
	},
	setMyGeo: function(){
		(new BMap.Geolocation()).getCurrentPosition((function(geo){
			this.state.map.addOverlay(new BMap.Circle(geo.point, 20));
		}).bind(this));
	},
	addMarkers: function(v, point){
		var marker = new BMap.Marker(point);
		var label = new BMap.Label(v.station.name,{offset:new BMap.Size(20,-10)});
		marker.setLabel(label);
		marker.addEventListener("click", (function(){
			this.setStation(v, label, true);
		}).bind(this));
		this.state.map.addOverlay(marker);
	},
	setMarkers: function() {
		if (!this.isLoadMarkers && this.state.map) {
			this.state.map.clearOverlays();
			var points = [];
			Stations.map((v, i)=>{
				if (v.station.lng=='null' || v.station.lat=='null') {
					(new BMap.Geocoder()).getPoint(v.station.name.replace('站', ''), (function(point){
						this.addMarkers(v, point);
					}).bind(this), '深圳罗湖');
				} else {
					var point = new BMap.Point(v.station.lng, v.station.lat);
					this.addMarkers(v, point);
				}
				
			});
			this.isLoadMarkers = true;
		}
	},
	setStation(v, label, noMove){
		!noMove && this.state.map.centerAndZoom(new BMap.Point(v.station.lng, v.station.lat), 18);
		Api.url(v.station.fddmz).fetch((function(data){
			var station = data.station;
			if (this.isMounted()) {
				label && label.setContent(station.name+'(借:'+(station.canborrow||0)+',空:'+(station.empty||0)+')');
				this.setState({station:station});
			}
		}).bind(this));
	},
	render() {
		return (
			<div>
			<StationSelector onSelect={this.setStation}/>
			<span>可借：{this.state.station.canborrow}, 空位：{this.state.station.empty}</span>
			<div id="map" ref="map" style={{position: 'absolute', top:0, left:0}}></div>
			</div>
		);
	}
});