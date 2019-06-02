import React, { Component } from 'react';
import Select from 'react-select';
import apiEndpoint from '../apiEndpoint';

export default class Shift extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            availableStaff: null,
            errorMessage: '',
        }

        this.handleStaffSelectChange = this.handleStaffSelectChange.bind(this);
        this.assignStaffMemberToShift = this.assignStaffMemberToShift.bind(this);
        this.unassignShift = this.unassignShift.bind(this);
    }

    componentDidMount() {
        this.setAvailableStaff();
    }

    render() {

        let assignStaffMember = null;
        if (!this.props.shift.assignedStaffMember) {

            let options = [];

            if (this.state.availableStaff) {
                this.state.availableStaff.forEach(staff => {
                    options.push({
                        value: staff._id,
                        label: staff.name
                    })
                });
            }

            assignStaffMember = <form className="form-control m-b-5" onSubmit={this.assignStaffMemberToShift}>
                <Select
                    name="selectStaff"
                    classNamePrefix="select"
                    onChange={this.handleStaffSelectChange}
                    options={options}
                />
                <button className="btn btn-secondary m-t-5">Assign Shift</button>
            </form>;
        } else {
            assignStaffMember = <div className="m-b-5">
                <button className="btn btn-secondary" onClick={this.unassignShift}>Unassign Shift</button>
            </div>
        }

        console.log(this.props.shift);

        return (
            <div className="shift-card p-t-15 p-b-15 p-l-10 p-r-10 m-t-25 m-b-25">
                <h2>{ `${this.props.shift.day} - ${this.props.shift.requiredRole}` }</h2>
                <p className="m-b-10">{ this.state.errorMessage }</p>
                <div className="m-b-5">Hours: { this.props.shift.hours }</div>
                <div className="m-b-5">Assigned Staff Member: { this.props.shift.assignedStaffMember ? this.props.shift.assignedStaffMember.name : "none" }</div>
                { assignStaffMember }
            </div>
        )
    }

    handleStaffSelectChange = (selectedOption) => {
        this.setState({assignedStaffMember: selectedOption});
    }

    assignStaffMemberToShift(event) {
        event.preventDefault();
        const shiftId = this.props.shift._id,
            staffMemberId = this.state.assignedStaffMember.value;

        const request = {
            query: `
                mutation {
                    assignShift(staffMemberID:"${staffMemberId}", shiftID:"${shiftId}") {
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
            return response.json()
        })
        .then((response) => {
            if (response.errors) {
                this.setState({
                    errorMessage: response.errors[0].message,
                });
            }
            this.props.callback();
        });
    }

    unassignShift(event) {
        event.preventDefault();
        const shiftId = this.props.shift._id;

        const request = {
            query: `
                mutation {
                    unassignShift(shiftID: "${shiftId}") {
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
        }).then((response) => {
            this.props.callback();
        });
    }

    setAvailableStaff() {
        let availableStaff = [];
        let assignedStaffMemberId = null;
        if (this.props.shift.assignedStaffMember !== null) {
            assignedStaffMemberId = this.props.shift.assignedStaffMember._id;
        };
        this.props.staff.forEach(staffMember => {
            if (assignedStaffMemberId !== null) {
                if (staffMember._id !== assignedStaffMemberId && !staffMember.daysUnavailable.includes(this.props.shift.day)) {
                    availableStaff.push(staffMember);
                }
            } else {
                if (!staffMember.daysUnavailable.includes(this.props.shift.day)) {
                    availableStaff.push(staffMember);
                }
            }
        });

        this.setState({
            availableStaff: availableStaff,
        });
    }
}
