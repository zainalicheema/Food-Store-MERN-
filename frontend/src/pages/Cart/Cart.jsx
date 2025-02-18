import { useContext } from 'react'
import './Cart.css'
import {StoreContext} from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const {food_list,cartItems,removeFromCart,getTotalCartAmount,url} = useContext(StoreContext)

  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-titles">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>  
        <br />
        <hr /> 
       {food_list.map((item)=>{
        if(cartItems[item._id]>0){
          return(
            <>
            <div className='cart-items-titles cart-items-item'>
             <img src={url+"/images/"+item.image} alt="" />
             <p>{item.name}</p>
             <p>${item.price}</p>
             <p>{cartItems[item._id]}</p>
             <p>${item.price*cartItems[item._id]}</p>
             <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
            </div>
            </>
          )
        }
       })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub-Total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Deliviry Fee</p>
              <p>{2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()+2}</b>
            </div>
            <hr />
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <p>If you have promo code,Enter it here</p>
          <div className="cart-promocode-input">
          <input type="text" placeholder='Promo Code' />
          <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
