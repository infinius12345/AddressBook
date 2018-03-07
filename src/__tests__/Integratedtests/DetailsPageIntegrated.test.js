import { MockedProvider } from "react-apollo/test-utils";
import gql from 'graphql-tag'
import React from 'react';
import { shallow, configure } from 'enzyme';
import {jasmine} from 'jest';
import Adapter from 'enzyme-adapter-react-16';
import DetailsPage,{CONTACT_QUERY} from '../../components/DetailPage';
import { mount } from "enzyme"
import { MemoryRouter as Router} from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { addTypenameToDocument } from 'apollo-utilities';

configure({ adapter: new Adapter() });
jest.clearAllTimers();

describe("graphql integration", () => {

  it("correctly renders", async () => {

    const query = addTypenameToDocument(CONTACT_QUERY);

    const variables = {"contactId":1};

    const match={
      params:{
        id:1
      }
    };

    const mockedData = {
      contact: {
        contactId: 1,
        firstName: "Hello",
        lastName: "JavaScript",
        __typename: "contact"
      },
      loading:false
    };

    const mockStore = configureStore();
    const initialState = {contacts: [{
      firstName: "Hello",
      lastName: "No"
    },
      {
        firstName: "Yes",
        lastName: "text"
      }]};
    let store = mockStore(initialState);

    const wrapper = mount(
      <MockedProvider
       mocks={
       [{ request: { query, variables }, result: { data: mockedData } },
      ]}
      ><Router>
        <DetailsPage store={store} match={match} contactquery={mockedData}/>
      </Router>
      </MockedProvider>
    );
    await new Promise(resolve => setTimeout(resolve))
    wrapper.update();
    expect(wrapper.length).toEqual(1);
  });


})
