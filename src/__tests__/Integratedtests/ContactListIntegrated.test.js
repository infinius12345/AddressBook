import { graphql } from "react-apollo";
import { MockedProvider } from "react-apollo/test-utils";
import gql from 'graphql-tag'
import React from 'react';
import { shallow, configure } from 'enzyme';
import {jasmine} from 'jest';
import Adapter from 'enzyme-adapter-react-16';
import ContactList,{CONTACTS_QUERY} from '../../components/ContactList';
import { mount } from "enzyme"
import { MemoryRouter as Router, withRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { addTypenameToDocument } from 'apollo-utilities';

configure({ adapter: new Adapter() });
jest.clearAllTimers();

describe("graphql integration", () => {

  it("correctly renders", async () => {

    const query = addTypenameToDocument(CONTACTS_QUERY);

    const variables = {};

    const mockedData = {
      contacts: [{
        firstName: "Hello",
        lastName: "No",
        __typename: "contact"
      },
        {
          firstName: "Yes",
          lastName: "text",
          __typename: "contact"
        }],
    };

    const mockStore = configureStore();
    const initialState = {};
    let store = mockStore(initialState);
    const contacts = [{
      firstName: "Hello",
      lastName: "No"
    },
      {
        firstName: "Yes",
        lastName: "text"
      }];
    const wrapper = mount(
      <MockedProvider mocks={[
        { request: { query, variables }, result: { data: mockedData } }
      ]}><Router>
        <ContactList store={store} contacts={contacts}/>
      </Router>
      </MockedProvider>
    );
    await new Promise(resolve => setTimeout(resolve))
    wrapper.update();
    expect(wrapper.length).toEqual(1);
  });


})
