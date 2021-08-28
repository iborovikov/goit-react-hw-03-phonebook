import { Component } from "react"

class Contact extends Component {

    takeId = (e) => {
        this.props.deleteContact(e.currentTarget.id)
    };

    render() {
        const { contacts } = this.props
        const { takeId } = this
        return (
            contacts.map(({ name, number, id }) =>
                <li key={id}>{name}: {number} <button type='button' id={id} onClick={takeId}>Delete</button></li>)
        );
    };
};

export default Contact