import React from "react";
import { Button } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
const Card = ({ imgUrl, name, price }) => {
    const handlePayment = async() => {
        const {data:{key}} = await axios.get("http://localhost:8080/api/getKey");
        const {data:{order}} = await axios.post("http://localhost:8080/api/checkout",{
            price
        }); 
        const options = {
          "key": key, // Enter the Key ID generated from the Dashboard
          "amount": order.price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": order.currency,
          "name": "Prashant Industries",
          "description": "Test Transaction",
          "image": "https://media.licdn.com/dms/image/D4D03AQH7dAWYJyLVpg/profile-displayphoto-shrink_800_800/0/1678025618489?e=1711584000&v=beta&t=433bUPG0rmUZu0F1aJWuLQ7_sQBAxJxGwvTzWPoIDkM",
          "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "callback_url": "http://localhost:8080/api/payment",
          "prefill": {
              "name": "Prashant Pal",
              "email": "prashantpal2468@gmail.com",
              "contact": "7985624948"
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#3399cc"
          }
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  return (
    <ChakraProvider>
      <div className="card">
        <img src={imgUrl} alt="Product 1" />
        <div className="card-description">
          <h3>{name}</h3>
          <p>Price: ₹{price}</p>
          <Button colorScheme="teal" size="sm" onClick={()=>handlePayment()}>
            Buy Now
          </Button>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Card;
