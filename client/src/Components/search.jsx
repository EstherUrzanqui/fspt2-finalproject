import React from 'react'
import {  Form, FormGroup, Input, Button, } from 'reactstrap'
import './search.css'


class Search extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      category: '' 
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
    console.log(e.target.value)
}

  handleSubmit = event => {
    event.preventDefault()
    const { query, category } = this.state
    this.props.onSearch(query, category)
  }


  render() {
    const { query, category } = this.state
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0 search'>
          <Input
            type='text'
            name='query'
            value={query}
            id='search-input'
            placeholder='Where do you want your new adventure?'
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
        <Input 
          type='select' 
          name='category' 
          id='category' 
          placeholder='Select category'
          value= {category}
          onChange= {this.handleChange}>
          <option value= ' '>All categories</option> //change css for this to #999
          <option>Food and Drinks</option>
          <option>Cycling</option>
          <option>Crafts</option>
          <option>Animals</option>
          <option>Dancing</option>
        </Input>
        </FormGroup>
        <Button>Search</Button>
      </Form>
    )
  }
}

export default Search


