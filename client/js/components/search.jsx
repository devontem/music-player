var React = require('react');
var _ = require('lodash');
// var SC = require('soundcloud');

var SearchComponent = React.createClass({
	getInitialState: function(){
		return {
			query: ""
		}
	},

	updateQuery: function(event){
		// calls the render function
		this.setState({
			query: event.target.value
		});

		this.performQuery(this.state.query);
	},

	// underscore debounce performs the function after X seconds
	 performQuery: 
	 // _.debounce(
		function(){
			SC.get('/tracks', { q: this.state.query }, this.updateResults);
		},
	// 	300
	// ),

	updateResults: function(results){
		// console.log(results);
		this.props.onSearchResults(results);
	},	

	clearSearch: function(event){
		// calls the render function
		this.setState({
			query: ''
		});
	},

	render: function(){
		var iconClasses = "glyphicon glyphicon-remove form-control-feedback clickable";
		if (this.state.query === ''){
			iconClasses += " hidden";
		}

		return (
			<div className="row">
				<div className="form-group has-feedback">
					<input name="query"
									placeholder="Search for a song"
									type="text"
									autoComplete="false"
									className="form-control"
									onChange={ this.updateQuery } 
									value={ this.state.query }
									/>
					<span onClick={ this.clearSearch } className={ iconClasses }></span>
				</div>
			</div>
		)
	}
});

module.exports = SearchComponent;