import React, { Component } from 'react';

class AddData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            person_id: '',
            name: '',
            age: '',
            record_date: '',
           
            errors: {},
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    validateForm = () => {
        const { person_id, name, age, record_date } = this.state;
        const errors = {};
        if (!person_id) errors.person_id = "Person ID is required.";
        if (!name) errors.name = "Name is required.";
        if (!age) errors.age = "Age is required.";
        if (!record_date) errors.record_date = "Record Date is required.";
        return errors;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validateForm();

        if (Object.keys(errors).length === 0) {
            // Pass the form data to the parent component
            this.props.onSubmit(this.state);
            // Clear the form
            this.setState({
                person_id: '',
                name: '',
                age: '',
                record_date: '',
                errors: {},
            });
            this.props.onCancel(); // Close the form
        } else {
            this.setState({ errors });
        }
    };

    handleFormSubmit = () => {
        var currentData = {};
        currentData["personId"] = this.state.person_id;
        currentData["name"] = this.state.name;
        currentData["age"] = this.state.age;
        currentData["recordDate"] = this.state.record_date;
        this.props.methods.onSubmit(currentData);
        console.log(currentData)
        console.log(this.state);
    }
    render() {
        const { person_id, name, age, record_date, errors } = this.state;
        return (
            <div className="form-container">
                <form>
                    <table className='table'>
                        <thead>
                            <tr>
                                <td>PersonId</td>
                                <td>Name</td>
                                <td>Age</td>
                                <td>RecordDate</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="text" name="person_id" maxLength="3" required value={person_id} onChange={this.handleChange} />
                                    {errors.person_id && <span className="error">{errors.person_id}</span>}
                                </td>
                                <td>
                                    <input type="text" name="name" required value={name} onChange={this.handleChange}/>
                                    {errors.name && <span className="error">{errors.name}</span>}
                                </td>
                                <td>
                                    <input type="number" name="age" min="0" required value={age} onChange={this.handleChange} />
                                    {errors.age && <span className="error">{errors.age}</span>}
                                </td>
                                <td>
                                    <input type="date" name="record_date" required value={record_date} onChange={this.handleChange}/>
                                    {errors.record_date && <span className="error">{errors.record_date}</span>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit" className='btn btn-primary mx-2' onClick={this.handleFormSubmit}>Submit</button>
                    <button type="button" className='btn btn-primary mx-2' onClick={this.props.onCancel}>Cancel</button>
                </form>
            </div>
        );
    }
}

export default AddData;
