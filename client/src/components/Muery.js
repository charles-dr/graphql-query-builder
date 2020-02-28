import React, { Component } from 'react';
import PropTypes from "prop-types";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { analyzeToQuery } from '../utils/func';
// const QUERY_USERS = gql`
// query Users {
//     users {
//         id
//         name
//         email
//     }
// }
// `

export default class Muery extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    };

    state = {
        query: gql`query A {B}`,
        displayName: "Query",
        count: 0,
        primary: ""
    }

    componentDidMount(props) {
        console.log('[Component mounted]');
        this.updateStatusFromProps(props);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('[received new props]', nextProps);
        this.updateStatusFromProps(nextProps);
    }

    updateStatusFromProps(props) {
        if (!props) return;

        // const strQuery = ` Users {users{${props.fields}}}`;

        if (props.actionQuery === true) {
            const result = analyzeToQuery(props.fields); console.log(result);
            if (result.status === true) {
                // let temp = `AA { ${result.data} }`;
                this.setState({
                    primary: result.primary,
                    query: gql`
                        query ${result.primary} {${result.data}}
                `});
            }

        }
    }

    render() {
        return (
            <Query query={this.state.query} rand={Math.random()} displayName={this.state.displayName}>
                {
                    ({ data, error }) => {
                        if (error) return this.props.children(false);
                        if (data) return this.props.children(data[this.state.primary])
                        return null;
                    }
                }
            </Query>
        );
    }
}