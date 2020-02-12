import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import Login from './Login';
import firebase from 'firebase'
import base, { firebaseApp } from '../base'; 

export default class Inventory extends Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    }
    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({user});
            }
        })
    }

    authHandler = async (authData) => {
        //Look up current store in firebase database
        const store = await base.fetch(this.props.storeId, { context: this})
        //Claim it if there is no owner
        if (!store.owner){
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        //Set the state of inventory component
        this.setState({ uid: authData.user.uid, owner: store.owner || authData.user.uid})
    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebase
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler)
    }

    logout = async () => {
        await firebase.auth().signOut()
        this.setState({ uid: null })
    }

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>
        // check if logged in
        if (!this.state.uid){
            return <Login authenticate={this.authenticate}/>;
        }
        //check if there not owner of the store
        if (this.state.uid !== this.state.owner){
            return (
                <div>
                    <p>Sorry you are not the owner!</p>
                    {logout}
                </div>
            )
        }
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fish).map(key => <EditFishForm fish={this.props.fish[key]} key={key} updateFish={this.props.updateFish} index={key} deleteFish={this.props.deleteFish}/>)}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadFishes}>Load Sample Fishes</button>
            </div>
        )
    }
}
