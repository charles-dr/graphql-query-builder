import React, { Component } from 'react';
import QueryBuilder from '../components/QueryBuilder';

class Home extends Component {
    state = {
        strQuery: "organization(1).fields('name').users.fields('name').organizations.fields('name').users.fields('name','email')",
        seed: "",
        fields: "organization(1).fields('name').users.fields('name').organizations.fields('name').users.fields('name','email')",
        actionQuery: false,
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value, actionQuery: false });
    }

    queryNow = () => {
        console.log('[clicked query now!]');
        this.setState({fields: `${this.state.strQuery}`, actionQuery: true });
    }

    render() {
        return (
            <div className="HomeContainer">
                <h1 className="text-center">Query Builder</h1>
                <input className="QueryInput" type="text" name="strQuery" value={this.state.strQuery} onChange={this.handleChange} />
                <div className="SubmitContainer">
                    <button className="QueryButton" onClick={this.queryNow}>Query Now!</button>
                </div>

                <QueryBuilder fields={this.state.fields} actionQuery={this.state.actionQuery}>
                    {(data) => {
                        if (!data) return (<span>Error!</span>);
                        if (data) return (
                            <div><pre>{JSON.stringify(data, null, '\t')}</pre></div>
                        )
                    }}
                </QueryBuilder>
            </div>
        );
    }
}

export default Home;