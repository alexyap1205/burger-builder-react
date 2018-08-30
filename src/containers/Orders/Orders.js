import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-instance';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    componentDidMount(){
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id:key});
                }
                console.log(response.data);
                this.setState({orders: fetchedOrders, loading: false});
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render(){
        let orders = <Spinner/>;
        if (!this.state.loading){
            const orderList = this.state.orders.map(order => {
                return (<Order key={order.id} ingredients={order.ingredients} price={order.price}/>);
            });
            orders = (
                <div>
                    {orderList}
                </div>
            );
        }

        return orders;
    };
}

export default withErrorHandler(Orders, axios);