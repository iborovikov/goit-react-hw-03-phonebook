import { Component } from "react";
import s from '../Filter/filter.module.css'

class Filter extends Component {

    handleInputChange = (e) => {
        this.props.onFilterInputChange(e.currentTarget.value);
    };

    render() {
        return (
            <label>
                <input
                    className={s.input}
                    type="text"
                    name="filter"
                    value={this.props.filter}
                    onChange={this.handleInputChange}
                />
            </label>
        );
    };
};

export default Filter