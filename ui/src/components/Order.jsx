import '../css/order.css';
import React, { useState } from 'react';
import axios from 'axios';



let Order = () => {

    const [customerName, setCustomerName] = useState('');

    const handleInputChange = (e) => {
        setCustomerName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:3000/place-order', {
                customerName: customerName
            }).then((response) => {
                console.log(response);
                setCustomerName('');
            }).catch((error) => {
                console.log(error);
            });
        }
        catch (e) {
            console.log(e);
        }
    }


    return (
        <div className="container">
            <h1>Create Order</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Customer Name</label>
                    <input
                        value={customerName}
                        type="text"
                        onChange={handleInputChange}
                    />
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default Order;