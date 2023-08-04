import React, { useContext, useEffect, useState } from 'react'
import { OrderContext } from '../../context/OrderContext'
import axios from 'axios'

const CompletePage = ({ setStep }) => {
  
  const [orderData] = useContext(OrderContext)
  const [orderHistory, setOrderHistory] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    orderCompleted(orderData)
  }, [orderData])
  
  const orderCompleted = async (orderData) => {
    try {
      const res = await axios.post('http://localhost:4000/order', orderData)
      setOrderHistory(res.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const orderTable = orderHistory.map((item) => (
    <tr key={item.orderNumber}>
      <td>{item.orderNumber}</td>
      <td>{item.price}</td>
    </tr>
  ))

  if(loading) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: 'royalblue' }}>YOUR ORDER HAS BEEN COMPLETED!</h1>
        <br/>
        <h3>지금까지의 모든 주문 내역</h3>
        
        <table style={{ margin: 'auto' }}>
          <tbody>
            <tr>
              <th>주문번호</th>
              <th>가격</th>
            </tr>
            {orderTable}
          </tbody>
        </table>

        <br/>
        <button onClick={() => setStep(0)}>첫 페이지로 이동</button>
      </div>
    )
  }


}

export default CompletePage