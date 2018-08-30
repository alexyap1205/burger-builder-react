import React from 'react';
import classes from './Order.css';
import INGREDIENT_PRICES from '../../components/Burger/IngredientPrices';

const order = (props) => {
    let totalPrice = 4;
    const ingredientList = [];

    for (let key in props.ingredients){
        ingredientList.push({name: key, amount: props.ingredients[key]});
        totalPrice += INGREDIENT_PRICES[key] * props.ingredients[key];
    }

    const ingredientsOutput = ingredientList.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }} key={ig.name}>
            {ig.name} ({ig.amount})
        </span>
    });

    return (<div className={classes.Order}>
        <p>Ingredients: {ingredientsOutput}</p>
        <p>Price: <strong>USD {totalPrice.toFixed(2)}</strong></p>
    </div>);
};

export default order;