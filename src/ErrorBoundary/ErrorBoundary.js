import React from 'react'
import PropTypes from 'prop-types'


export default class ErrorBound extends React.Component {
    state = { error: null };
  
    static getDerivedStateFromError(error) {
      
        console.error(error);
        
        return { error };
    }
    render() {
       
        if (this.state.error) {
            return (
                <main className="error-page">
                    <h1>Something seems to have gone wrong</h1>
                </main>
            );
        }
        // Otherwise, render the children
        return this.props.children;
    }
}

ErrorBound.propTypes = {
    children: PropTypes.object.isRequired
}