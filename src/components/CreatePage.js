import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {connect} from 'react-redux'
import {compose} from 'react-apollo'
import ContactList from './ContactList'

export class CreatePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      contactId:  props.match.params.id,
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: '',
      set: false,
    }
    this.setContacttoState = this.setContacttoState.bind(this);

  }
  setContacttoState(contact){
    this.setState({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      address: contact.address,
      phone: contact.phone,
      set:true,
    })
  }

  render() {
    if (this.props.contactQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }
    this.contact = this.props.contactQuery.contact
    if(!this.state.set && this.contact !== null){this.setContacttoState(this.contact)}

    return (
      <div id="wrapper">
        <span id="list">
          <h2 className="listtitle">All Contacts</h2>
          <ContactList contacts={this.props.contactsLoaded}/>
        </span>
        <span id="form">
        <form onSubmit={this.handlePost}>
          <h1>{this.contact ===null ? "Create": "Edit"} Contact</h1>
          <input
            autoFocus
            className="input"
            onChange={e => this.setState({ firstName: e.target.value })}
            placeholder="First Name"
            type="text"
            value={this.state.firstName}
          />
          <input
            className="input"
            cols={50}
            onChange={e => this.setState({ lastName: e.target.value })}
            placeholder="Last Name"
            rows={8}
            value={this.state.lastName}
          />
          <input
            className="input"
            cols={50}
            onChange={e => this.setState({ phone: e.target.value })}
            placeholder="Phone"
            rows={8}
            value={this.state.phone}
          />
          <input
            className="input"
            cols={50}
            onChange={e => this.setState({ email: e.target.value })}
            placeholder="Email"
            rows={8}
            type="Email"
            value={this.state.email}
          />
          <input
            className="input"
            cols={50}
            onChange={e => this.setState({ address: e.target.value })}
            placeholder="Address"
            rows={8}
            value={this.state.address}
          />
          <input
            className="input"
            type="submit"
            value={this.contact ===null ? "Create": "Edit"}
          />{' '}
        </form>
        </span>

      </div>
    )
  }

  handlePost = async e => {
    e.preventDefault();
    const { contactId,firstName,lastName,email,phone,address} = this.state;
    if(this.contact!==null) {
      await this.props.updatePersonMutation({
        variables: {contactId, firstName, lastName, email, phone, address},
      })
      this.props.history.replace(`/contact/${contactId}`)
    }
    else{
      let nextId = this.props.contactsLoaded!==0 && this.props.contactsLoaded !== undefined
        ? this.props.contactsLoaded.length + 1 : 0
      await this.props.createPersonMutation({
        variables: {contactId, firstName, lastName, email, phone, address},
      })
      this.props.history.replace(`/contact/${contactId}`)
    }

  }
}

const CREATE_PERSON_MUTATION = gql`
  mutation CreatePersonMutation($contactId: Int!,$firstName: String!, $lastName: String!,$email: String, $phone: String, $address: String) {
    createPerson(contactId:$contactId,firstName: $firstName, lastName: $lastName, email: $email, phone:$phone,address:$address) {
      contactId
      firstName
      lastName
    }
  }
`
const UPDATE_PERSON_MUTATION = gql`
  mutation UpdatePersonMutation($contactId: Int!,$firstName: String!, $lastName: String!,$email: String, $phone: String, $address: String) {
    updatePerson(contactId:$contactId,firstName: $firstName, lastName: $lastName, email: $email, phone:$phone,address:$address) {
      contactId
      firstName
      lastName
      email
      phone
      address
    }
  }
`

const CONTACT_QUERY = gql`
  query ContactQuery($id: Int!) {
    contact(contactId: $id) {
      firstName
      lastName
      email
      address
      phone
    }
  }
`

const mapStateToProps = state => ({ contactsLoaded: state.contactsLoaded});

const mapDispatchToProps = dispatch => ({
})

export default compose(
  graphql(CONTACT_QUERY, {
    name: 'contactQuery',
    options: props => ({
      variables: {
        id: props.match.params.id ? props.match.params.id : 1,
      },
    }),
  }),
  graphql(CREATE_PERSON_MUTATION, {
    name: 'createPersonMutation',
  }),
  graphql(UPDATE_PERSON_MUTATION, {
    name: 'updatePersonMutation',
  }),
  withRouter,
  connect(mapStateToProps,mapDispatchToProps)
)(CreatePage)
