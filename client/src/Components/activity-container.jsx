import React from 'react'
import './activity-container.css'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
} from 'reactstrap'
import axios from 'axios'

class ActivityContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
    }
  }

  toggle = () => {
    this.setState(state => ({
      modal: !state.modal,
    }))
  }

  handleClick = id => () => {
    this.props.addActivity(id)
    this.setState(state => ({
      modal: !state.modal,
    }))
    axios(`http://localhost:5000/userActivities`, {
      method: 'POST',
      data: {
        userId: this.props.user.id,
        activityId: id,
      },
    })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    this.goToDashboard()
    console.log(id)
  }

  goToDashboard = () => {
    this.props.history.push('/dashboard')
  }

  render() {
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
    } = this.props
    return (
      <CardDeck className='container'>
        <Card>
          <CardImg className='image' src={picture} alt='Activity image cap' />
          <CardBody>
            <CardTitle>
              <b>{name}</b>
            </CardTitle>
            <CardSubtitle>
              <i>Category</i>: {category}
            </CardSubtitle>
            <CardText>
              <i>When:</i> {startDate} <i>at</i> {startHour}
            </CardText>
            <CardText>
              <i>Meeting point:</i> {address} ({city})
            </CardText>
            <Button color='primary' onClick={this.toggle}>
              Find out more!
            </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>
                {name} <br /> {category}
              </ModalHeader>
              <ModalBody>
                {description}
                <hr /> Start: {startDate} at {startHour}
                <hr /> Finish: {endDate} at {endHour}
                <hr /> Meeting point: {address} ({city})
                <hr />
                <b>
                  Clicking on <i>Join the activity!</i> will add the activity to
                  your profile!
                </b>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='success'
                  title='Please log in before adding an activity'
                  onClick={this.handleClick(id)}>
                  Join the activity!
                </Button>{' '}
                {/* <Button color='warning' onClick={this.toggle}>
                  Message the organizer!
                </Button> */}
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
      </CardDeck>
    )
  }
}
export default ActivityContainer
