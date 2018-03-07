import {CONTACTS_LOADED} from '../actions'

const initialState={
  contactsLoaded: [],
}

function reducer(state=initialState, action) {
  switch (action.type) {
    case CONTACTS_LOADED:
      return{...state,contactsLoaded: action.contacts}
    default:
      return state;
  }
}

export default reducer;
