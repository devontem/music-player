var React = require('react');

var Track = React.createClass({
	render: function(){
		var artwork_url = this.props.track.artwork_url || "http://1vyf1h2a37bmf88hy3i8ce9e.wpengine.netdna-cdn.com/wp-content/themes/public/img/noimgavailable.jpg";
		return (
			<div className="track">
				<img src={ artwork_url } className="img-thumbnail artwork" />
				<div className="title">{ this.props.track.title }</div>
			</div>
		);
	}
});

module.exports = Track;