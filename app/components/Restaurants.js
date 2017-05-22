var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

class CityInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    };

		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
	handleChange(event) {
    var value = event.target.value;

    this.setState(function () {
      return {
        city: value
      }
    });
  }
	handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.state.city
    );
  }
	render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
        	{this.props.label}
        </label>
        <input
          id='city'
          placeholder='enter city here'
          type='text'
          value={this.state.city}
          autoComplete='off'
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.city}>
            Submit
        </button>
      </form>
    )
  }
}

CityInput.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

CityInput.defaultProps = {
  label: 'Select City',
}

class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
	handleSubmit(city) {
    this.setState(function () {
      var newState = {};
      newState['cityName'] = city;
      return newState;
    });
  }
  handleReset() {
		this.setState(function() {
			var newState = {};
			newState['cityName'] = '';
			return newState;
		});
	}
	render() {
		var match = this.props.match;
    var cityName = this.state.cityName;
    return (
      <div>
        <div className='row'>
          {!cityName &&
            <CityInput
              label='Select City'
              onSubmit={this.handleSubmit}
          />}

          {cityName &&
          <div>
						<Link
							className='button'
							to={{
								pathname: match.url + '/results',
								search: '?city=' + cityName
							}}>
								Search for Restaurants in {this.state.cityName}
						</Link>

						<button
							className='reset'
							onClick={this.handleReset.bind(null)}>
								Reset
						</button>
					</div>
				}	
        </div>
      </div>
    )
  }
}

module.exports = Restaurants;