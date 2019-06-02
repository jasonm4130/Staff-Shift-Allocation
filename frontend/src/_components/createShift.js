import React, { Component } from 'react';
import Select from 'react-select';

const days = [
    { value: 'MON', label: 'Monday' },
    { value: 'TUE', label: 'Tuesday' },
    { value: 'WED', label: 'Wednesday' },
    { value: 'THU', label: 'Thursday' },
    { value: 'FRI', label: 'Friday' },
    { value: 'SAT', label: 'Saturday' },
    { value: 'SUN', label: 'Sunday' }
];

const roles = [
    { value: 'Manager', label: 'Manager' },
    { value: 'Chef', label: 'Chef' },
    { value: 'Cook', label: 'Cook' },
    { value: 'Dishwasher', label: 'Dishwasher' }
];

export default class CreateShift extends Component {

    constructor(props) {
        super(props)
        this.state = {
            description: '',
            hours: '',
            day: '',
            requiredRole: '',
            successMessage: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDaysSelectChange = this.handleDaysSelectChange.bind(this);
        this.handleRolesSelectChange = this.handleRolesSelectChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleDaysSelectChange = (selectedOption) => {
        this.setState({day: selectedOption});
    }

    handleRolesSelectChange = (selectedOption) => {
        this.setState({requiredRole: selectedOption});
    }

    handleSubmit(event) {
        event.preventDefault();
        const description = this.state.description,
            hours = this.state.hours,
            requiredRole = this.state.requiredRole,
            day = this.state.day;

        const request = {
            query: `
                mutation {
                    createShift(
                        shiftInput:{
                            description: "${description}",
                            hours: ${hours},
                            day: "${day.value}",
                            requiredRole: "${requiredRole.value}"
                        })
                    {
                        _id
                    }
                }
            `
        }

        fetch('http://localhost:8000/api', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            this.setState({
                successMessage: "Successfully created shift!",
            })
        );
    }

    render() {
        return (
            <div className="m-t-75">
                <h1>Create Shift</h1>
                <h3>{ this.state.successMessage }</h3>
                <form className="form-control" onSubmit={this.handleSubmit}>
                    <div className="row justify-content-center">
                        <div className="col-md-6 d-flex justify-content-center flex-column m-t-25">
                            <label htmlFor="day">Day</label>
                            <Select
                                name="day"
                                classNamePrefix="select"
                                onChange={this.handleDaysSelectChange}
                                options={days}
                            />
                        </div>
                        <div className="col-md-6 d-flex justify-content-center flex-column m-t-25">
                            <label htmlFor="requiredRole">Required Role</label>
                            <Select
                                name="requiredRole"
                                classNamePrefix="select"
                                onChange={this.handleRolesSelectChange}
                                options={roles}
                            />
                        </div>
                        <div className="col-md-6 d-flex justify-content-center flex-column m-t-25">
                            <label htmlFor="description">Description</label>
                            <input className="text-input" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6 d-flex justify-content-center flex-column m-t-25">
                            <label htmlFor="hours">Shift Length (hours)</label>
                            <input className="text-input" type="number" name="hours" value={this.state.hours} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-12 m-t-25">
                            <button className="btn btn-primary" type="submit">Create Shift</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
