import useCart from '../hooks/useContext'

const cartItem = ({item}) => {
  const {dispatch} = useCart()

  const handleIncrease = () => {
    dispatch(
        {type: 'INCREASE_QUANTITY', payload: { id: item.id }}
    )
  }

  const handleDecrease = () => {
    dispatch({type: 'DECREASE_QUANTITY', payload: { id: item.id }})
  }

  const handleRemove = () => {
    dispatch({type: 'REMOVE_FROM_CART', payload: item.id})
  }

  return (
    <div className="cart-item">
        <h3>{item.title}</h3>
        <p>Price: ${item.price}</p>
        <p>Quantity: {item.quantity}</p>
        <div className="cart-item-actions">
        <button type="button" onClick={handleIncrease}>Increase</button>
        <button type="button" onClick={handleDecrease}>Decrease</button>
        <button type="button" onClick={handleRemove}>Remove</button>
        </div>
    </div>
    
  )
}

export default cartItem