// include react
// equivalnt to require in past
import React from "react";

import Form from "./children/Form";
import Results from "./children/Results";
import History from "./children/History";

// helper for making ajax request to API
import helpers from "./utils/helpers";

class Main extends React.Component {

    constructor(props) {
        super(props);
        // Here we set a generic state associated with the number of clicks
        // Note how we added in this history state variable
        this.state = {
          searchTerm: "",
          results: "",
          history: []}
    }


    // The moment the page renders get the History
    componentDidMount() {
        // Get the latest history.
        helpers.getHistory().then(function (response) {
            console.log(response);
            if (response !== this.state.history) {
                console.log("History", response.data);
                this.setState({history: response.data});
            }
        }.bind(this));
    }

    // If the component changes (i.e. if a search is entered)...
    componentDidUpdate() {

        // Run the query for the address
        helpers.runQuery(this.state.searchTerm).then(function (data) {
            if (data !== this.state.results) {
                console.log("Address", data);
                this.setState({results: data});

                // After we've received the result... then post the search term to our history.
                //note all the .bind() - we need to make sure the helper functions have the
                //correct context
                helpers.postHistory(this.state.searchTerm).then(function () {
                    console.log("Updated!");

                    // After we've done the post... then get the updated history
                    helpers.getHistory().then(function (response) {
                        console.log("Current History", response.data);

                        console.log("History", response.data);

                        this.setState({history: response.data});

                    }.bind(this));
                }.bind(this));
            }
        }.bind(this));
    }

    // This function allows childrens to update the parent.
    setTerm(term) {
        this.setState({searchTerm: term});
    }

    // Here we render the function
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="jumbotron">
                        <h2 className="text-center">NY Slime Article Scrubber</h2>
                        <p className="text-center">
                            <em>Search for and annotate articles of interest</em>
                        </p>
                    </div>

                    <div className="col-md-6">

                        <Form setTerm={this.setTerm.bind(this)}/>

                    </div>

                    <div className="col-md-6">

                        <Results address={this.state.results}/>

                    </div>

                </div>

                <div className="row">

                    <History history={this.state.history}/>

                </div>

            </div>
        );
    }
}

// Export the component back for use in other files
export default Main;
