import React from 'react';
import { shallow, configure } from 'enzyme';
import {jest} from 'jest';
import Adapter from 'enzyme-adapter-react-16';
import {DetailPage} from '../../components/DetailPage';

configure({ adapter: new Adapter() });

const contactQueryFalse = {
  loading: false,
  contact:
    {
      firstName: "Hello",
      lastName: "No",
      email:"adsf@gmail.com",
      phone:"21312",
      address:"dsafdsaf",
    }
}

const match={
  params:{
    id:1
  }
};

test('ContactList renders correctly after Query', () => {
  const component = shallow(<DetailPage
    contactquery={contactQueryFalse}
    match={match}
  />);
  expect(component).toMatchSnapshot();
});
