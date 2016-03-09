var React = require('react');

var PlaylistTrack = React.createClass({
	render: function(){
		var selectedClasses = "collection-item avatar ";
		if (this.props.selected){
			selectedClasses+="orange";
		}

		var context = this;
		function removeSong(){
			context.props.removeSong(context.props.track) ;
		}
		function trackSelected(){
			context.props.trackSelected(context.props.track);
		}

		var artwork_url = this.props.track.artwork_url || "http://1vyf1h2a37bmf88hy3i8ce9e.wpengine.netdna-cdn.com/wp-content/themes/public/img/noimgavailable.jpg";
		return (
		    <li className={ selectedClasses }>
		      <img  onClick={ trackSelected } src={ artwork_url } alt="" className="circle" />
		      <span onClick={ trackSelected } className="title clickable">{this.props.track.title}</span>
		      <a href="#" onClick={ removeSong } className="secondary-content del"><i className="material-icons">delete</i></a>
		    </li>
		);
	}
});

module.exports = PlaylistTrack;