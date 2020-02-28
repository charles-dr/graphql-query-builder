import React, { Component } from 'react';
import Muery from '../components/Muery';

class Home extends Component{
    render() {
        return (
            <>
            <h1>Hi I'm Home!</h1>
            <Muery>
                {(data) => {
                    return (
                    <p>{JSON.stringify(data)}</p>
                    )
                }}
            </Muery>
            </>
        );
    }
}

export default Home;