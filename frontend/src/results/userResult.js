import { API } from './api.js'
import { BaseResult } from './baseResult.js';
import { ResultsTable } from './resultsTable.js';

/**
 * Users class which handles user API searches
 */
class UserResult extends BaseResult {
    async callAPI(search) {
        var query = search.replace(" ", "").split(",");
        return new Promise((resolve, reject) => {
            // Get the number of users searched for
            const items = search.match(/,/g) === null ? 1 : search.match(/,/g).length + 1;
            if(items === 1) this.setState({title: "Statistics about user " + search});
            else this.setState({title: "Statistics about users: [" + search + "]"});
            
            // TODO: Single user: Given a user, get the number of movies watched per genre.

            // Call the API
            API.searchMoviesByUsers(query).then((value) => {
                this.pushMovies(value, resolve);
            }).catch((reason) => {
                reject(reason);
            });
        });
    }
    
    draw() {
        // TODO: Compare users
        return (
            <div id="users">
                <h1>{ this.state.title }</h1><br/>
                <ResultsTable heading={ this.state.heading } data={ this.state.movies } />
            </div>
        );
    }
}

export default UserResult;