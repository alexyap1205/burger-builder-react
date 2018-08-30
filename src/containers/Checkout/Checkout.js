import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import INGREDIENT_PRICES from '../../components/Burger/IngredientPrices';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        },
        price: 0
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 4;

        for (let param of query.entries()){
            ingredients[param[0]] = +param[1];
            totalPrice += INGREDIENT_PRICES[param[0]];
        }

        console.log(ingredients);

        this.setState({ingredients: ingredients, price: totalPrice});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.state.ingredients}/>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} {...props}/>)}/>
            </div>
        );
    }
}

export default Checkout;