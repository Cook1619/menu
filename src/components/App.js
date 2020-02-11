import React, { Component } from 'react'
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order'
import sampleFishes from '../sample-fishes'
import Fish from './Fish';
import base from '../base';

export default class App extends Component {
    state = {
        fishes: {},
        order: {}
    }

    componentDidMount() {
        const {params} = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId)
        if(localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)})
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        //take a copy of existing state
        const fishes = { ...this.state.fishes };
        //add new fish to fish variable
        fishes[`fish${Date.now()}`] = fish
        // set new fishes object to state
        this.setState({ fishes })
    }

    updateFish = (key, updatedFish) => {
        //take a cpy of current state
        const fishes = {...this.state.fishes};
        //update state
        fishes[key] = updatedFish;
        //set state
        this.setState({ fishes })
    }

    loadFishes = () => {
        this.setState({ fishes: sampleFishes })
    }

    addToOrder = (key) => {
        const order = { ...this.state.order };
        order[key] = order[key] + 1 || 1
        this.setState({ order })
    }

    deleteFish = (key) => {
        const fishes = {...this.state.fishes}
        fishes[key] = null
        this.setState({ fishes });
    }

    removeFromOrder = (key) => {
        const order = {...this.state.order}
        delete order[key]
        this.setState({ order })
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish
                            key={key}
                            details={this.state.fishes[key]}
                            index={key}
                            addToOrder={this.addToOrder} />
                        )}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
                <Inventory addFish={this.addFish} loadFishes={this.loadFishes} fish={this.state.fishes} updateFish={this.updateFish} deleteFish={this.deleteFish}/>
            </div>
        )
    }
}
