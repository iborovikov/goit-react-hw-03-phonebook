import { Component } from "react";
import Contact from "./Contact";

class ContactList extends Component {

    deleteContact = (id) => {
        this.props.removeContact(id)
    };

    render() {
        const { contacts } = this.props
        const { deleteContact } = this

        return (
        <ul>
           <Contact deleteContact={deleteContact} contacts={contacts} />
        </ul>
        );
    };
};
export default ContactList