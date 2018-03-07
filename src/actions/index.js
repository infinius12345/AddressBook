export const CONTACTS_LOADED = 'CONTACTS_LOADED';

export const contactsLoaded = (contacts) => ({
  type: CONTACTS_LOADED,
  contacts,
});
