import React, { Component } from 'react'

export default class DisplayStaff extends Component {

    constructor(props) {
        super(props)

        this.getStaffMembers();

    }

    render() {
        return (
            <div className="m-t-75">
                <h1>Staff Members</h1>
            </div>
        )
    }

    getStaffMembers() {

        const request = {
            query: `
            query {
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

        fetch('http://localhost:8000/api', {
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
                staff: response,
            })
        })
        .catch(error => {
            console.log(error);
        });
    }
}
