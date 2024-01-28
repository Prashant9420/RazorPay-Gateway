import React from 'react'
import { useSearchParams } from 'react-router-dom'
const PaymentSuccess = () => {
    const params=useSearchParams()[0];
    const reference=params.get("reference");
  return (
    <div style={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:'70vh'
    }}>
        <h1>PAYMENT SUCCESSFULL</h1>
        <h3>Thank you for shopping with us</h3>
        <h3>Refernece ID: {reference}</h3>

    </div>
  )
}

export default PaymentSuccess