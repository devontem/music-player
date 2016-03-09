var React = require('react');
var PlaylistTrack = require('./playlistTrack.jsx');
var Track = require('./track.jsx');
// var SC = require('soundcloud');

var Playlist = React.createClass({

	getInitialState: function(){
		return {
			player: null,
			currentSong: {},
			songPlaying: false
		}
	},

	trackSelected: function(track){
		console.log(track.title, " was selected.");
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
		  Materialize.toast('Playing '+track.title, 3000, 'rounded')
			this.state.songPlaying = true;
			var context = this;

			SC.stream('/tracks/'+track.id, function(player){
				player.play();
				context.setState({
					player: player,
					currentSong: track
				});

				// playing next song on song finish
				var html5Audio = player._player._html5Audio;
        html5Audio.addEventListener('ended', function(){ 
        	context.nextSong();
        });
			});		
	},

	pauseTrack: function(){
		if (this.state.songPlaying && this.state.currentSong.id){
			// Materialize.toast("Song paused.", 3000, 'rounded')
			this.state.player.pause();
			this.state.songPlaying = false;
		} else {
			Materialize.toast("Song isn't playing, unable to pause.", 3000, 'rounded')
			console.log('Song is already paused/not started, cannot pause.')
		}
	},

	resumeSong: function(){
		if (!this.state.songPlaying && this.state.currentSong.id){
			this.state.songPlaying = true;
			this.state.player.play();
		} else if (!this.state.player){

			if (this.props.tracks[0]){
				console.log('Beginning a playlist');
				Materialize.toast('Starting the playlist!', 3000, 'rounded')
				this.playTrack(this.props.tracks[0]);
			} else {
				Materialize.toast('Please add songs to playlist.', 3000, 'rounded')
				console.log("Please add songs to your playlist!")
			}
		} else {
			Materialize.toast('Song is already playing, cannot resume.', 3000, 'rounded')
			console.log('Song is already playing, cannot resume.');
		}
	},

	nextSong: function(){
		if (this.state.currentSong.id){
			for(var i=0; i < this.props.tracks.length;i++){
				if (this.props.tracks[i].id === this.state.currentSong.id && this.props.tracks[i+1]){
					var nextSong = this.props.tracks[i+1];
					this.state.player.stop();
					this.playTrack(nextSong);
					return;
				}
			}
		} else {
			console.log('Click play to start playlist!');
			// if (this.props.tracks[0]){
			// console.log('Beginning a playlist');
			// this.playTrack(this.props.tracks[0]);
			// } else {
			// 	console.log('Please add songs to your playlist.')
			// }
		}
	},

	prevSong: function(){
		if (this.state.currentSong.id){
			for(var i=0; i < this.props.tracks.length;i++){
				if (this.props.tracks[i].id === this.state.currentSong.id && this.props.tracks[i-1]){
					var prevSong = this.props.tracks[i-1];
					this.state.player.stop();
					this.playTrack(prevSong);
					return;
				}
			}
		} else {
			console.log('Click play to start playlist!');
		}
	},

	render: function(){
		var context = this;
		var hiddenUL = "collection z-depth-1";
		var selectedSong = "clickable";
		var trackComponents = [];
		var tracks = this.props.tracks || [];
		var title = this.state.currentSong.title || "No song is playing.";
		var artwork_url = this.state.currentSong.artwork_url || "http://1vyf1h2a37bmf88hy3i8ce9e.wpengine.netdna-cdn.com/wp-content/themes/public/img/noimgavailable.jpg";
		
		// Hiding playlist box if empty
		if (this.props.tracks.length < 1){
			hiddenUL += ' hidden';
		}

		// Adding color to currently playing song
		function currentSong(currentSong, track){
			return currentSong && track.id === currentSong.id; 
		}

		for (var i = 0; i < tracks.length; i ++){
			var isCurrent = currentSong(this.state.currentSong, tracks[i]);

			trackComponents.push(
				<div key={ tracks[i].id } className={ selectedSong } >
					<PlaylistTrack track={ tracks[i] } trackSelected={ this.trackSelected } removeSong={ context.props.removeSong } selected={ isCurrent } />
				</div>
			);
		}

		return (
			<section>
			  <div className="card small">
		      <div className="card-image">
		        <img src={artwork_url}/>
		        <span className="card-title"></span>
		      </div>
		      <div className="card-content">
		        <p className="songTitle">{ title }</p>
		      </div>
		      <div className="card-action">
		        <a className="noMargin"><i onClick={ this.prevSong } className="col s3 clickable small material-icons">skip_previous</i></a>
		        <a className="noMargin"><i onClick={ this.resumeSong } className="col s3 clickable small material-icons">play_arrow</i></a>
		        <a className="noMargin"><i onClick={ this.pauseTrack } className="col s3 clickable small material-icons">pause</i></a>
		        <a className="noMargin"><i onClick={ this.nextSong } className="col s3 clickable small material-icons">skip_next</i></a>
	        </div>
	      </div>

				<ul className={ hiddenUL } >
						<p className="playlistTitle">Playlist</p>
						<div className="playlist">
							{ trackComponents }
						</div>
				</ul>
			</section>
		);
	}
});

module.exports = Playlist;