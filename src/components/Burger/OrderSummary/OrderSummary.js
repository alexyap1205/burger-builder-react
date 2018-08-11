import React, {Component} from 'react';

import Auxillary from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // Doesn't need to be a class, just for logging componentWillUpdate
    componentWillUpdate = () => {
      console.log('[OrderSummary] componentWillUpdate');
    };

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>});

        return (
            <Auxillary>
                <h3>Your Order</h3>
                <p>Burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Auxillary>
        );
    }
}

export default OrderSummary;