import React, { useContext, useState } from 'react'
import { OrderContext } from '../../context/OrderContext'

const SummaryPage = ({ setStep }) => {

  const [checked, setChecked] = useState(false)
  const [orderDetails] = useContext(OrderContext)

  const productArray = Array.from(orderDetails.products)
  const productList = productArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ))

  const hasOptions = orderDetails.options.size > 0
  let optionDisplay = null

  if(hasOptions) {
    const optionArray = Array.from(orderDetails.options.keys())
    const optionList = optionArray.map((key) => <li key={key}>{key}</li>)
    optionDisplay = (
      <>
        <h2>옵션: {orderDetails.totals.options}</h2>
        <ul>{optionList}</ul>
      </>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault() // 버튼 눌렀을 때 페이지가 자동으로 refresh 되는 것을 방지
    setStep(2)
  }

  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품: {orderDetails.totals.products}</h2>
      <ul>{productList}</ul>
      {optionDisplay}
      <h2
        style={{ color: 'royalblue', borderTop: '1px solid #e9e9e9', paddingTop: '20px' }}
      >
        총 금액: {orderDetails.totals.total}
      </h2>

      <form style={{marginTop: '10px'}} onSubmit={handleSubmit}>
        <input
          type='checkbox'
          checked={checked}
          id='confirm-checkbox'
          onChange={(e) => setChecked(e.target.checked)}
        />{" "}
        <label htmlFor='confirm-checkbox'>주문 내용을 확인하셨나요?</label>
        <br/>
        <button type='submit' disabled={!checked} style={{marginTop: '10px'}}>주문 확인</button>
      </form>
    </div>
  )
}

export default SummaryPage