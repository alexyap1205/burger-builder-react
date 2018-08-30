import React, {Component} from 'react';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axiosInstance from '../../axios-instance';

import INGREDIENT_PRICES from '../../components/Burger/IngredientPrices';

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount = () => {
        axiosInstance.get('/ingredients.json')
            .then(response => {
                console.log(response);
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true});
            });
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((accumulate, current) => {
           return accumulate + current;
        }, 0);

        this.setState({purchasable: sum > 0});
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const  updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount >= 1){
            const updatedCount = oldCount - 1;
            const  updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            });
            this.updatePurchaseState(updatedIngredients);
        }
    };

    purchaseCancelledHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        const queryParams =[];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString});

    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p>Error Loading Ingredients</p> : <Spinner/>;

        let orderSummary = null;

        if (this.state.ingredients){
            burger = (
                <Auxillary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}/>
                </Auxillary>);

            orderSummary = <OrderSummary
                purchaseCancelled={this.purchaseCancelledHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}/>
        }

         if (this.state.loading){
             orderSummary = <Spinner/>;
         }

        return (
            <Auxillary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);