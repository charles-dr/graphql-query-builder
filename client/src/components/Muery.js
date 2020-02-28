import React, { Component } from 'react';
import PropTypes from "prop-types";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const QUERY_USERS = gql`
query Users {
    users {
        id
        name
        email
    }
}
`

export default class Muery extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired
    };

    render() {
        return (
            <Query query={QUERY_USERS}>
                {
                    ({data, error}) => {
                        if (error) return this.props.children(false);
                        if (data) return this.props.children(data)
                        return null;
                    }
                }
            </Query>
        );
    }
}