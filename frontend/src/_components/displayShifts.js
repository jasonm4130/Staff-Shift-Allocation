import React, { Component } from 'react'
import Shift from './shift';
import apiEndpoint from '../apiEndpoint';

export default class DisplayShifts extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: null,
            shiftAssignedMessage: null,
        }

        this.getShifts = this.getShifts.bind(this);
        this.shiftAssigned = this.shiftAssigned.bind(this);

        this.getShifts();

    }

    render() {
        return (
            <div className="m-t-75">
                <h1>Shifts</h1>
                <div className="row">
                    { this.displayShifts() }
                </div>
            </div>
        )
    }

    displayShifts() {
        if(this.state.data) {
            let shifts = [];

            this.state.data.shifts.forEach((shift, key) => {
                shifts.push(
                    <div className="col-md-4" key={shift._id}>
                        <Shift
                            shift={shift}
                            staff={this.state.data.staffMembers}
                            callback={this.getShifts}
                        />
                    </div>
                );
            });
            return shifts;
        }
        return null;
    }

    shiftAssigned() {
        this.setState({
            shiftAssignedMessage: "Your shift has been assigned, please refresh to view updates.",
        })
    }

    getShifts() {

        const request = {
            query: `
            query {
                shifts {
                    _id
                    day
                    description
                    hours
                    requiredRole
                    assignedStaffMember {
                        name
                    }
                }
                staffMembers {
                    _id
                    name
                    maxHours
                    daysUnavailable
                    validRoles
                    assignedShifts{
                        _id
                        day
                        description
                        hours
                        requiredRole
                    }
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
        .then(response => {
            this.setState({
                data: response.data,
            })
        })
        .catch(error => {
            console.log(error);
        });
    }
}
