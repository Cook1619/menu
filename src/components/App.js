import React, { Component } from 'react'
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order'

export default class App extends Component {
    state = {
        fishes: {},
        order: {}
    }
    addFish = (fish) => {
        //take a copy of existing state
        const fishes = {...this.state.fishes};
        //add new fish to fish variable
        fishes[`fish${Date.now()}`] = fish
        // set new fishes object to state
        this.setState({ fishes })
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                </div>
                <Order />
                <Inventory addFish={this.addFish}/>
            </div>
        )
    }
}
