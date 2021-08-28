import { Component } from 'react';
import './App.css';
import Form from './Components/Form/Form'
import Filter from './Components/Filter/filter'
import ContactList from './Components/Contacts/ContactList';
import shortid from 'shortid';

class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };

  addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact]
    }));

  };
  
  removeContact = (id) => {
    this.setState(prevState => {
      const newContacts = prevState.contacts.filter(contact => contact.id !== id)
      return { contacts: newContacts }
    })
  };

  onFilterInputChange = (value) => {
    this.setState(
      { filter: value }
    )
  };

  resetFilterInput = () => {
    this.setState({
      filter: ''
    });
  };

  isNameInList = (name) => this.state.contacts.find(contact =>
      contact.name.toLowerCase() === name.toLowerCase());

  onFormSubmit = (name, number) => {
    if (this.isNameInList(name)) {
      this.resetFilterInput()
      return alert(`${name} is already in contacts`)
    };
    this.addContact(name, number);
    this.resetFilterInput()
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts)
    if (parsedContacts) {
      this.setState({
      contacts: parsedContacts
    })
    };
    
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  };

  render() {
    const { contacts, filter } = this.state
    const {onFormSubmit, onFilterInputChange, removeContact} = this


    const normalizedContact = filter.toLowerCase();
    const visibleContacts = contacts.filter(
      contact => contact.name.toLowerCase().includes(normalizedContact));
    
    return (
      <>
        <h1>Phonebook</h1>
        <Form onFormSubmit={onFormSubmit} />
        <h2>Contacts</h2>
        <Filter onFilterInputChange={ onFilterInputChange } filter={filter} />
        <ContactList contacts={visibleContacts} removeContact={ removeContact }/>
      </>
    )
  };
};


export default App;
