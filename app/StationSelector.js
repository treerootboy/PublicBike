var React = require('react');
var Style = require('./StationSelector.css');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			input: '',
			isFocus: false
		};
	},
	isFocus(isFocus){
		this.setState({isFocus:isFocus});
	},
	changeHandler(e){
		this.setState({input:e.target.value});
	},
	selectedHandler(data){
		console.log(data.station.name);
		this.setState({input: data.station.name})
		this.props.onSelect(data);
	},
	componentDidUpdate: function(prevProps, prevState) {
		$(this.refs.list).width($(this.refs.input).width());
		isFocus ? $(this.refs.list).show() : $(this.refs.list).hide()
	},
	render(){
		return (
			<div>
				<input ref='input' value={this.state.input} onChange={this.changeHandler} onFocus={this.isFocus.bind(null, true)} placeholder='请输入站点'/>
				<ul ref='list' className={Style.list}>
					{Stations.map((v, i) => {
						if (v.station.name.search(this.state.input)!==-1)
						return <li key={'item_'+i} className={Style.item} onClick={this.selectedHandler.bind(null, v)}>{v.station.name}</li>;
					})}
				</ul>
			</div>
		);
	}
});