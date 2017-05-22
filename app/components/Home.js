var React = require('react');
var Link = require('react-router-dom').Link;

class Home extends React.Component {
  render() {
    return (
    	<div className='home-container'>
        	<h1 className='homeTitle'>Foodie Finder</h1>
        	<h3 className='homeSub'>Find Great Restaurants Close to You!</h3>
        	<Link className='button' to='/restaurants'>Search for Restaurants</Link>
    	</div>
    )
  }
}

module.exports = Home;