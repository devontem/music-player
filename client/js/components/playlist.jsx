var React = require('react');
var Track = require('./track.jsx');
// var SC = require('soundcloud');

var Playlist = React.createClass({

	getInitialState: function(){
		return {
			player: null,
			currentSong: null,
			songPlaying: false
		}
	},

	trackSelected: function(track){
		console.log(track, " was played!");
		if (!this.state.songPlaying){

			// if a new song is being played that wasn't previously paused
			if (this.state.currentSong && track.id === this.state.currentSong.id){
				
				// plays a previously paused song
				console.log('Resuming paused song.')
				this.resumeSong();

			} else {

				// plays a new song
				console.log('Playing a new song!')
				this.playTrack(track);
			}

		} else {
			// if song is playing, pause it
			console.log('Current song is paused.')
			this.pauseTrack();

			// if song is playing and new song is clicked, play it
			if (track.id !== this.state.currentSong.id){

				console.log('Switching to a new song')
				this.state.player.stop();
				this.playTrack(track);
			}
			
		}
		
	},

	playTrack: function(track){
		this.state.songPlaying = true;
		var context = this;

		SC.stream('/tracks/'+track.id, function(player){
			player.play();
			context.setState({
				player: player,
				currentSong: track
			});
			console.log('player', player);
		});
	},

	pauseTrack: function(){
		this.state.player.pause();
		this.state.songPlaying = false;
	},

	resumeSong: function(){
		this.state.songPlaying = true;
		this.state.player.play();
	},

	render: function(){
		var trackComponents = [];
		var tracks = this.props.tracks || [];

		for (var i = 0; i < tracks.length; i ++){
			trackComponents.push(
				<div className="clickable" onClick={ this.trackSelected.bind(this, tracks[i]) }>
					<Track track={ tracks[i] } />
				</div>
			);
		}

		return (
			<div className="row">
				<div className="playlist">
					{ trackComponents }
				</div>
			</div>
		);
	}
});

module.exports = Playlist;