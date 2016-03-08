var React = require('react');
var SearchComponent = require('./search.jsx');
var TrackSelector = require('./trackSelector.jsx');
var Playlist = require('./playlist.jsx');

var MusicApp = React.createClass({

	getInitialState: function(){
		// initialize soundCloud API
		SC.initialize({
			client_id: this.props.soundCloudKey
		});

		return {
			queriedTracks: [],
			playlistTracks: []
		}
	},

	addToPlaylist: function(track){
		if (!this.state.playlistTracks.includes(track)){
			// changes a state variable, call forceUpdate() to save changes
			this.state.playlistTracks.push(track);
			this.forceUpdate();
		}
	},

	removeFromPlaylist: function(track){
		if(track){

		} else {
			this.state.shift();
			this.forceUpdate();
		}
	},

	updateSearchResults: function(tracks){
		this.setState({ 
			queriedTracks: tracks
		});
	},

	render: function(){
		var queriedTracks = this.state.queriedTracks;
		var playlistTracks = this.state.playlistTracks;

		return (
			<section>
				<header className="container text-center">
					<h1>JukeBox App</h1>
				</header>

				<article className="container text-center">
					<SearchComponent onSearchResults={ this.updateSearchResults }/>
				</article>

				<article className=" container text-center">
					<TrackSelector tracks={ queriedTracks } onTrackSelected={ this.addToPlaylist }/>
				</article>

				<footer className="fixed-footer">
					<Playlist tracks={ playlistTracks } removeFromPlaylist={ this.removeFromPlaylist }/>
				</footer>
			</section>
			);
	}
});

module.exports = MusicApp;