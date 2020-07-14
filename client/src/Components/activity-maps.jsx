import React from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY

const center = {
  lat: 41.729284,
  lng: 1.822515,
}

const mapStyles = {
    width: "100%",
    height: "400px",
};

class ActivityMaps extends React.Component {
  state = {
    activities: [],
  }

  componentDidMount() {
    axios(`http://localhost:5000/activities`).then(response => {
      this.setState({
        activities: response.data,
      })
    })
  }

  componentDidUpdate() {
    const homeActivities = this.props.onSearch
    
    if(homeActivities !== this.state.activities) {
        this.setState({
            activities: homeActivities
        })
    }
  }
  /*handleSearch = event => {
      event.preventDefault()
    const { query, category } = this.state
    this.props.onSearch(query, category)
    console.log(this.props.onSearch(query, category))
  }*/
  
  render() {
    return (
      <Map google={this.props.google} styles={mapStyles} zoom={7} initialCenter={center}>
        {this.state.activities.map((activity, index) => (
          //console.log(activity),
          <Marker
            name={activity.name}
            key={activity.id}
            position={{ lat: activity.latitude, lng: activity.longitude }}
          />
        ))}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey,
})(ActivityMaps)
