import React from 'react';
import { shallow, configure } from 'enzyme';
import {jest} from 'jest';
import Adapter from 'enzyme-adapter-react-16';
import {Contact} from '../../components/ContactList';

configure({ adapter: new Adapter() });

const contactsQueryFalse = {
  loading: false
}
const contacts = [
  {
    firstName: "Hello",
    lastName: "No"
  },
  {
    firstName: "Yes",
    lastName: "text"
  }
]

test('ContactList renders correctly after Query', () => {
  const component = shallow(<Contact
              contactsQuery={contactsQueryFalse}
              contacts= {contacts}
  />);
  expect(component).toMatchSnapshot();
});
