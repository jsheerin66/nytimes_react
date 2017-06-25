// Include React
import React from 'react';

// Create the Child Component
class Form extends React.Component {

    constructor(props) {
        super(props);
        // Here we set a generic state associated with the text being searched for
        this.state = {term: ""}
    }

    // This function will respond to the user input
    handleChange(event) {

        this.setState({term: event.target.value});

    }

    // When a user submits...
    handleSubmit(event) {
        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
        // clicking the button
        event.preventDefault();

        // Set the parent to have the search term
        this.props.setTerm(this.state.term);
        this.setState({term: ""});
    }

    // Here we describe this component's render method
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h5 className="panel-title text-center">Search</h5>
                </div>
                <div className="panel-body text-center">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            {/* <h3 className="">
                              <strong>Topic</strong>
                            </h3> */}

                            <strong className="">Topic</strong>

                            {/*
                             Note how each of the form elements has an id that matches the state.
                             This is not necessary but it is convenient.
                             Also note how each has an onChange event associated with our handleChange event.
                             */}
                            <input
                                value={this.state.term}
                                type="text"
                                className="form-control text-center"
                                id="term"
                                onChange={this.handleChange.bind(this)}
                                required
                            />
                            <br/>
                            <strong>Start Year</strong>
                            <input
                                value={this.state.term}
                                type="text"
                                className="form-control text-center"
                                id="term"
                                onChange={this.handleChange.bind(this)}
                                required
                            />
                            <br/>
                            <strong>End Year</strong>
                            <input
                                value={this.state.term}
                                type="text"
                                className="form-control text-center"
                                id="term"
                                onChange={this.handleChange.bind(this)}
                                required
                            />
                            <br />
                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

// Export the component back for use in other files
export default Form;
