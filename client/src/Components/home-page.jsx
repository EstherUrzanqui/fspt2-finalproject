import React from 'react'
import './home-page.css'
import Search from './search'
import ActivityContainer from './activity-container'
import axios from 'axios'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activities: [],
      error: false,
      message: false,
    }
  }

  componentDidMount = () => {
    this.getActivities()
  }

  fetchSearchResults = (query= ' ', category = ' ') => {
    fetch(`http://localhost:5000/search?city=${query}&category=${category}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.length === 0) {
          this.setState({ message: true })
        } else {
          this.setState({
            activities: data,
            message: false,
          })
          console.log(data)
        }
      })
  }

  getActivities = () => {
    fetch('http://localhost:5000/activities')
    .then(response => {
      return response.json()
    })
      .then(response => {
        this.setState({
          activities: response,
          allCities: true,
        })
        console.log(response)
      })
      .catch(error => {
        this.setState({ error: true })
      })
  }

  handleAddActivity = id => {
    const currentActivity = this.state.activities.filter(
      activity => activity.id === id
    )
    console.log(currentActivity)
    //this.props.addActivity(currentActivity)
  }

  render() {
    return (
      <div className='home'>
        This web app is amazing! :) <hr />
        Fill in at least one...
        <br></br>
        <div>
          <Search onSearch={this.fetchSearchResults} />
        </div>
        {this.state.message ? (
          <div className='Message-add'>
            <h5>
              There is no activity in this city yet. Add the first one here(link
              to add form/log in)
            </h5>
          </div>
        ) : (
          this.state.activities.map(activity => {
            const {
              id,
              name,
              startDate,
              endDate,
              startHour,
              endHour,
              hostingId,
              longitude,
              latitude,
              address,
              description,
              category,
              picture,
              city,
            } = activity
            return (
              <ActivityContainer
                key={activity.id}
                id={activity.id}
                name={activity.name}
                startDate={activity.startDate}
                endDate={activity.endDate}
                startHour={activity.startHour}
                endHour={activity.endHour}
                hostingId={activity.hostingId}
                longitude={activity.longitude}
                latitude={activity.latitude}
                address={activity.address}
                description={activity.description}
                category={activity.category}
                picture={activity.picture}
                city={activity.city}
                addActivity={this.handleAddActivity}
              />
            )
          })
        )}
      </div>
    )
  }
}
export default HomePage
