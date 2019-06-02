import React, { Component } from 'react';
import Select from 'react-select';
import apiEndpoint from '../apiEndpoint';

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

export default class CreateStaff extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            maxHours: '',
            daysUnavailable: null,
            validRoles: null,
            successMessage: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDaysSelectChange = this.handleDaysSelectChange.bind(this);
        this.handleRolesSelectChange = this.handleRolesSelectChange.bind(this);        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleDaysSelectChange = (selectedOption) => {
        this.setState({daysUnavailable: selectedOption});
    }

    handleRolesSelectChange = (selectedOption) => {
        this.setState({validRoles: selectedOption});
    }

    handleSubmit(event) {
        event.preventDefault();
        const name = this.state.name,
            maxHours = this.state.maxHours;

        let validRoles = [];
        if (this.state.validRoles) {
            this.state.validRoles.forEach(validRole => {
                validRoles.push(`"${validRole.value}"`);
            });
        }

        let daysUnavailable = [];
        if (this.state.daysUnavailable) {
            this.state.daysUnavailable.forEach(day => {
                daysUnavailable.push(`"${day.value}"`);
            });
        }

        const request = {
            query: `
                mutation {
                    createStaffMember(
                        staffMemberInput:{
                            name: "${name}",
                            maxHours: ${maxHours},
                            daysUnavailable: [${daysUnavailable}],
                            validRoles: [${validRoles}]
                        })
                    {
                        _id
                    }
                }
            `
        }

        fetch(apiEndpoint, {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Failed!');
            }
            this.setState({
                successMessage: "User successfully created!",
            })
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="m-t-75">
                <h1>Create Staff Member</h1>
                <h3>{ this.state.successMessage }</h3>
                <form className="form-control" onSubmit={this.handleSubmit}>
                    <div className="row justify-content-center">
                        <div className="col-md-6 d-flex justify-content-center flex-column m-t-25">
                            <label htmlFor="name">Name</label>
                            <input className="text-input" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6 d-flex justify-content-center flex-column m-t-25">
                            <label htmlFor="maxHours">Maximum Hours</label>
                            <input className="text-input" type="number" name="maxHours" value={this.state.maxHours} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6 d-flex justify-content-center flex-column m-t-25">
                            <label htmlFor="daysUnavailable">Days Unavailable</label>
                            <Select
                                name="daysUnavailable"
                                isMulti={true}
                                classNamePrefix="select"
                                onChange={this.handleDaysSelectChange}
                                options={days}
                            />
                        </div>
                        <div className="col-md-6 d-flex justify-content-center flex-column m-t-25">
                            <label htmlFor="validRoles">Roles</label>
                            <Select
                                name="validRoles"
                                isMulti={true}
                                classNamePrefix="select"
                                onChange={this.handleRolesSelectChange}
                                options={roles}
                            />
                        </div>
                        <div className="col-md-12 m-t-25">
                            <button className="btn btn-primary" type="submit">Create Staff Member</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
