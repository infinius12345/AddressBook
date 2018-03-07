import React from 'react'
import {graphql, compose} from 'react-apollo'
import {Link, withRouter} from 'react-router-dom'
import gql from 'graphql-tag'
import ContactList from './ContactList'
import {connect} from 'react-redux'
import {contactsLoaded} from '../actions/index'

export class DetailPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
    }
  }

  render() {
    if (this.props.contactquery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }
    //console.log(this.props);
    let {contact} = this.props.contactquery

    if(contact===null){
      contact={};
      contact.firstName="No";
      contact.lastName = "found";
      contact.email = '';
      contact.address = '';
      contact.phone = '';
    }

    return (
      <React.Fragment>
        <div id="wrapper">
          <span id="list">
            <h2 className="listtitle">All Contacts</h2>
            <ContactList contacts={this.props.contactsLoaded}/>
          </span>

          <span id="detail">
            <div id="padding"><h1 className="heading">{contact.firstName} {contact.lastName}</h1>
              <Link className="link"
            to={`/edit/${contact.contactId}`}
              >Edit
            </Link></div>

            <table id="table">
              <tr id="row"><td id="column1">Phone:</td><td>{contact.phone}</td></tr>
              <tr id="row"><td id="column1">Email:</td><td>{contact.email}</td></tr>
              <tr id="row"><td id="column1">Address:</td><td>{contact.address}</td></tr>
            </table>


          </span>
        </div>


      </React.Fragment>
    )
  }

  deletePost = async id => {
    await this.props.deletePost({
      variables: {id},
    })
    this.props.history.replace('/')
  }

  publishDraft = async id => {
    await this.props.publishDraft({
      variables: {id},
    })
    this.props.history.replace('/')
  }
}

export const CONTACT_QUERY = gql`
  query contactquery($id: Int!) {
    contact(contactId: $id) {
      contactId
      firstName
      lastName
      email
      phone
      address
    }
  }
`

const mapStateToProps = state => ({contactsLoaded: state.contactsLoaded});

const mapDispatchToProps = dispatch => ({
  loadContacts: (contacts) =>
    dispatch(contactsLoaded(contacts)),
})

export default compose(
  graphql(CONTACT_QUERY, {
    name: 'contactquery',
    options: props => ({
      variables: {
        id: props.match.params.id ? props.match.params.id : 1,
      },
    }),
  }),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(DetailPage)
