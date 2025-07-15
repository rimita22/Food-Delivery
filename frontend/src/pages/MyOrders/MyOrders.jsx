import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        console.log("Requesting:", url + "/api/order/userOrders");

        try {
            const response = await axios.post(
                url + "/api/order/userOrders",
                {},
                { headers: { token: token } }
            );

            console.log("Orders response:", response.data);

            // Adjust this according to the shape you see in your console
            if (Array.isArray(response.data)) {
                setData(response.data);
            } else if (response.data.data && Array.isArray(response.data.data)) {
                setData(response.data.data);
            } else {
                console.warn("Unknown response shape:", response.data);
                setData([]);
            }

        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => (
                    <div key={index} className="my-orders-order">
                        <div className="order-icon">
                            <img src={assets.parcel_icon} alt="Parcel Icon" />
                        </div>

                        <div className="order-items">
                            {order.items?.map((item, idx) => (
                                <span key={idx}>
                                    {item.name} x {item.quantity}
                                    {idx !== order.items.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </div>

                        <div className="order-amount">
                            ${order.amount}.00
                        </div>

                        <div className="order-count">
                            Items: {order.items.length}
                        </div>

                        <div className="order-status">
                            <span>&#x25cf; <b>{order.status}</b></span>
                        </div>

                        <div className="order-track">
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
