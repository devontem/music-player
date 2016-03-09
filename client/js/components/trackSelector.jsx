var React = require('react');
var Track = require('./track.jsx');

var TrackSelector = React.createClass({

	handleTrackSelection: function(track){
		this.props.onTrackSelected(track);
	},

	render: function(){

		var trackComponents = [];
		var tracks = this.props.tracks || [];

		for (var i=0; i < tracks.length; i++){
			trackComponents.push(
				// All elements in a repeat need a react key
				<div key={ tracks[i].id } className="col-lg-3 col-md-4 col-sm-6 col-xs-12 col s4">
					<div className="clickable" onClick={ this.handleTrackSelection.bind(this, tracks[i]) } >
						<Track track={ tracks[i] } />
					</div>
				</div>
			);
		}

		return (
			<div className="row">
				{ trackComponents }
			</div>
		);
	}
})

module.exports = TrackSelector;