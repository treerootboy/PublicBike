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
		map.centerAndZoom('罗湖', 15);

		this.setState({map: map});
	},
	componentDidUpdate: function(prevProps, prevState) {
		// move map to the selected station
		if (this.state.station !== prevState.station) {
			var point = new BMap.Point(this.state.station.lng, this.state.station.lat);
			this.state.map.centerAndZoom(point, 18);
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
					Api.url(v.station.fddmz).fetch((function(data){
						if (data.station && this.isMounted()) this.setState({station:data.station});
					}).bind(this));
				}).bind(this));
				this.state.map.addOverlay(marker);
			});
			this.isLoadMarkers = true;
		}
	},
	selectorHandler(v){
		Api.url(v.station.fddmz).fetch((function(data){
			if (data.station && this.isMounted()) this.setState({station:data.station});
		}).bind(this));
	},
	render() {
		return (
			<div>
			<StationSelector onSelect={this.selectorHandler}/>
			<span>可借：{this.state.station.canborrow}, 空位：{this.state.station.empty}</span>
			<div id="map" style={{width:500, height:320}}></div>
			</div>
		);
	}
});