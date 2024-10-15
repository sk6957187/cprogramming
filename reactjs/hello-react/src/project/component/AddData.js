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
            records: [], // Store submitted data here
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
            // Create the new data object
            const newData = {
                personId: this.state.person_id,
                name: this.state.name,
                age: this.state.age,
                recordDate: this.state.record_date,
            };

            // Add new data to the records array
            this.setState((prevState) => ({
                records: [...prevState.records, newData],
                person_id: '',
                name: '',
                age: '',
                record_date: '',
                errors: {},
            }));
            console.log(newData);
            this.props.methods.saveData(newData);
        } else {
            this.setState({ errors });
        }
    };

    render() {
        const { person_id, name, age, record_date, errors, records } = this.state;
        var recordsData = this.state.records;
        return (
            <>
                <h3 className='my-3'>Add and View Data</h3>
                <div className="form-container">
                    <form onSubmit={this.handleSubmit}>
                        <table className='table text-center '>
                            <thead>
                                <tr>
                                    <td>PersonId</td>
                                    <td>Name</td>
                                    <td>Age</td>
                                    <td>DOB</td>
                                </tr>
                            </thead>
                            <tbody >
                                <tr>
                                    <td>
                                        <input type="number" name="person_id" maxLength="3" required value={person_id} onChange={this.handleChange} className='text-center' />
                                        {errors.person_id && <span className="error">{errors.person_id}</span>}
                                    </td>
                                    <td>
                                        <input type="text" name="name" required value={name} onChange={this.handleChange} className='text-center'/>
                                        {errors.name && <span className="error">{errors.name}</span>}
                                    </td>
                                    <td>
                                        <input type="number" name="age" min="0" required value={age} onChange={this.handleChange} className='text-center'/>
                                        {errors.age && <span className="error">{errors.age}</span>}
                                    </td>
                                    <td>
                                        <input type="date" name="record_date" required value={record_date} onChange={this.handleChange} className='text-center'/>
                                        {errors.record_date && <span className="error">{errors.record_date}</span>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit" className='btn btn-primary mx-2'>
                            Submit
                        </button>
                    </form>
                </div>
            </>
        );
    }
}

export default AddData;
