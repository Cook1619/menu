import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import Login from './Login';
import firebase from 'firebase'

export default class Inventory extends Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    }

    authHandler = async (authData) => {
        
    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebase
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler)
    }
    render() {
        return <Login authenticate={this.authenticate}/>;
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {Object.keys(this.props.fish).map(key => <EditFishForm fish={this.props.fish[key]} key={key} updateFish={this.props.updateFish} index={key} deleteFish={this.props.deleteFish}/>)}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadFishes}>Load Sample Fishes</button>
            </div>
        )
    }
}
