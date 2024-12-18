import "./OrderOverview.css"
import {useContext} from "react";
import {OrderContext} from "../../../context/OrderProvider.jsx";
import OrderItem from "./order-item/OrderItem.jsx";

function OrderOverview({className}) {
  const {currentOrder, setCurrentOrder, status} = useContext(OrderContext)
  function removeItemFromOrder(itemId) {
    const itemIndex = currentOrder.findIndex((item) => item.id === itemId);
    // If the item exists, create a new array without that specific item
    if (itemIndex !== -1) {
      const updatedItems = [
        ...currentOrder.slice(0, itemIndex), // Items before the item to remove
        ...currentOrder.slice(itemIndex + 1) // Items after the item to remove
      ];
      setCurrentOrder(updatedItems); // Update the order with the new array
    }
  }
  return (

    <div className={`order-overview${className ? className : ''}`}>
      {currentOrder.length > 0 && currentOrder.map((item, index) => (
        <OrderItem
          key={index}
          id={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
          status={status}
          onClick={() => removeItemFromOrder(item.id)}
        />
      ))}
    </div>
  )
}
export default OrderOverview;