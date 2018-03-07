import React from 'react'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import {contactsLoaded} from '../actions'
import {connect} from 'react-redux'

export class Contact extends React.Component {
  state={filter:""}

  render() {
    if (this.props.contactsQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }
    let filteredContacts=[];
    if(this.props.contacts === undefined || this.props.contacts.length === 0) {
      this.props.loadContacts(this.props.contactsQuery.contacts);
    }
    else {
      filteredContacts = this.props.contacts.filter(contact => (contact.firstName + " " + contact.lastName).includes(this.state.filter))
    }
    return (
      <div>
      <input
        autoFocus
        // className="w-100 pa2 mv2 br2 b--black-20 bw1"
        className="search"
        onChange={e => this.setState({filter: e.target.value})}
        placeholder="Search using 'FirstName LastName'"
        type="text"
        value={this.state.filter}
      />
        {filteredContacts.map((contact,i) =>
        <div key={i} className="contactwrapper">
        <Link key={i}
          to={`/contact/${contact.contactId}`}
          className="list"
        >
          {contact.lastName},{contact.firstName}
        </Link>
        </div>
      )}
      </div>
    )
  }
}

export const CONTACTS_QUERY= gql`
  query contacts{
    contacts{
      lastName
      firstName
      contactId
    }
  }
`
const mapStateToProps = state => ({ });;
const mapDispatchToProps = dispatch => ({
  loadContacts: (contacts) =>
    dispatch(contactsLoaded(contacts))
})

export default compose(
  graphql(CONTACTS_QUERY, {
    name: 'contactsQuery',
  }, { skip: ({ props }) => props.contacts === undefined || props.contacts === 0}),
  withRouter,
  connect(mapStateToProps,mapDispatchToProps)
)(Contact)

