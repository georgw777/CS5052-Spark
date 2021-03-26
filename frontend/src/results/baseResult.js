import React from 'react';

export class BaseResult {
    /**
     * Call the API to get a result
     * @param search a search query
     * @returns a promise which should call the API to set state for this object
     */
    async callAPI(search) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    
    /**
     * Render this class using JSX
     * @returns a JSX string which renders the results of calling the API
     */
    render() {
        return null;
    }
}

/**
 * Generate a component to display results from a results class
 * The resultClass object should extend the default one given above
 */
export function resultDisplayer(resultClass) {
    return class extends React.Component {
        _mounted = false;
        constructor(props) {
            super(props);
            this.state = {
                loaded: false,
            }
        }
    
        componentDidMount() {
            // Here, call the API function given to us & then mount the component
            this._mounted = true;
            resultClass.callAPI(this.props.search).then(() => {
                if(this._mounted) this.setState({ success: true, loaded: true });
            }).catch((reason) => {
                if(this._mounted) this.setState({ success: false, reason: reason.toString(), loaded: true });
            });
        }
    
        componentWillUnmount() {
            this._mounted = false;
        }
    
        render() {
            // Return that we're waiting if we are...
            if(!this.state.loaded) return (
                <h1>Waiting on server...</h1>
            );
    
            // Ensure we loaded successfully
            if(!this.state.success) return (
                <div id="error">
                    <h1>An error occured!</h1>
                    <p>{ this.state.reason }</p>
                </div>
            );
    
            // Otherwise, return the render method given to us
            return (
                <div id="base">
                    { resultClass.render() }
                </div>
            );
        }
    }
}