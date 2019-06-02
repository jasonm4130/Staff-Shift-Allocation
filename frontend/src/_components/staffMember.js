import React, { Component } from 'react'

export default class StaffMember extends Component {
    render() {
        return (
            <div className="staff-member-card p-t-15 p-b-15 p-l-10 p-r-10 m-t-25 m-b-25">
                <h2 className="text-center">{ this.props.staff.name }</h2>
                <div className="m-b-5">Max Hours: { this.props.staff.maxHours }</div>
                <div className="m-b-5">Days Unavailable: { this.renderArray(this.props.staff.daysUnavailable) }</div>
                <div className="m-b-5">Roles: { this.renderArray(this.props.staff.validRoles) }</div>
            </div>
        )
    }

    renderArray(array) {
        let niceRender = '';
        if (array.length > 0) {
            array.forEach((element, key) => {
                if (key !== array.length - 1) {
                    niceRender += `${element}, `;
                } else {
                    niceRender += `${element}`;
                }
            });
        } else {
            return "None";
        }
        return niceRender;
    }
}
