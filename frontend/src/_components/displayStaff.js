import React, { Component } from 'react'
import StaffMember from './staffMember';

export default class DisplayStaff extends Component {

    constructor(props) {
        super(props)

        this.state = {
            staff: null,
        }

        this.getStaffMembers();

    }

    render() {
        return (
            <div className="m-t-75">
                <h1>Staff Members</h1>
                <div className="row">
                    { this.displayStaffMembers() }
                </div>
            </div>
        )
    }

    displayStaffMembers() {
        if(this.state.staff) {
            let staffMembers = [];

            this.state.staff.data.staffMembers.forEach((staffMember, key) => {
                staffMembers.push(
                    <div className="col-md-4" key={staffMember._id}>
                        <StaffMember
                            staff={staffMember}
                        />
                    </div>
                );
            });
            return staffMembers;
        }
        return null;
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

        fetch('https://shift-allocation.herokuapp.com/api', {
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
