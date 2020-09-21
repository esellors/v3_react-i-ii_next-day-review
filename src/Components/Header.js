/* 
    We need to get the user's name when the component mounts.
    We want the view to display "<NAME'S> Special List".
*/

import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.getUserName = this.getUserName.bind(this);
    }

    componentDidMount() {
        this.getUserName();
    }

    getUserName() {
        const name = window.prompt('What is your name?');

        this.setState({ name });
    }

    render() {
        const { name } = this.state;

        return (
            <h2>{name}'s Special List</h2>
        )
    }
}