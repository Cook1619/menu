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
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
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

    loadFishes = () => {
        this.setState({ fishes: sampleFishes })
    }

    addToOrder = (key) => {
        const order = { ...this.state.order };
        order[key] = order[key] + 1 || 1
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
                <Order fishes={this.state.fishes} order={this.state.order}/>
                <Inventory addFish={this.addFish} loadFishes={this.loadFishes} />
            </div>
        )
    }
}
