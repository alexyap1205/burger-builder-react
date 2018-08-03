import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    let transformedIngreadients = Object.keys(props.ingredients)
        .map(igKey => {
           return [...Array(props.ingredients[igKey])] // This returns a single array spreading all the content
               .map((_, i) => {
               return <BurgerIngredient key={igKey + i} type={igKey}/> // This defines the content of the top map
           })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    if (transformedIngreadients.length === 0){
        transformedIngreadients = <p>Please start adding ingredients!</p>
    }

  return (
      <div className={classes.Burger}>
          <BurgerIngredient type="bread-top"/>
          {transformedIngreadients}
          <BurgerIngredient type="bread-bottom"/>
      </div>
  );
};

export default burger;