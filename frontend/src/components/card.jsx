import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import { CircularProgress } from "@chakra-ui/react";
const Card = ({ imgUrl, name, price }) => {
  const [loader, setLoader] = useState(false);
  const handlePayment = async () => {
    setLoader(true);
    const {
      data: { key },
    } = await axios.get("https://razor-pay-server.onrender.com/api/getKey");
    const {
      data: { order },
    } = await axios.post("https://razor-pay-server.onrender.com/api/checkout", {
      price,
    });
    const options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: order.price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Prashant Industries",
      description: "Test Transaction",
      image:
        "https://media.licdn.com/dms/image/D4D03AQH7dAWYJyLVpg/profile-displayphoto-shrink_800_800/0/1678025618489?e=1711584000&v=beta&t=433bUPG0rmUZu0F1aJWuLQ7_sQBAxJxGwvTzWPoIDkM",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "https://razor-pay-server.onrender.com/api/payment",
      prefill: {
        name: "Prashant Pal",
        email: "prashantpal2468@gmail.com",
        contact: "7985624948",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#000000",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
    setLoader(false);
  };
  return (
    <ChakraProvider>
      <div className="card">
        <img src={imgUrl} alt="Product 1" />
        <div className="card-description">
          <h3>{name}</h3>
          <p>Price: ₹{price}</p>
          {loader ? (
            <CircularProgress  isIndeterminate color="green.300" size='32px' thickness='8px'/>
          ) : (
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => handlePayment()}
            >
              Buy Now
            </Button>
          )}
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Card;
