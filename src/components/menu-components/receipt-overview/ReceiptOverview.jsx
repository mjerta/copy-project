import "./ReceiptOverview.css"
import TextLineText from "./text-line-text/TextLineText.jsx";
import Button from "../../general-components/button/Button.jsx";
import coinIcon from "../../../assets/coin-icon.svg"
import {OrderContext} from "../../../context/OrderProvider.jsx";
import {useContext} from "react";
import {AuthContext} from "../../../context/AuthenticationProvider.jsx";
import convertPrice from "../../../helpers/convertPrice.js";
import useAddOrder
  from "../../../custom-hooks/api-requests/POST/useAddOrder.jsx";

function ReceiptOverview({className}) {
  const {
    profileData,
    points,
    setPoints,
    token,
    isAuthenticated
  } = useContext(AuthContext);
  const {
    totalPrice,
    totalPriceWithoutTax,
    calculateDiscount,
    priceWithDiscount,
    discount,
    isButtonDisabled,
    setIsButtonDisabled,
    finalPrice,
    isTableValid,
    currentOrder,
    currentLocation,
    setStatus,
    status
  } = useContext(OrderContext);

  const {addOrder, isLoading, error} = useAddOrder(token,  currentOrder, currentLocation, setStatus, isAuthenticated);

  function handleDiscountClick() {
    calculateDiscount(profileData.points);
    if (totalPrice >= discount && totalPrice > 0) {
      setPoints(0);
      setIsButtonDisabled(true);
    }
  }

  return (<div className={`receipt-overview ${className ? className : ''}`}>
      <TextLineText
        spanTextOne={"Sub total:"}
        spanTextTwo={"With tax:"}
        priceFirstText={convertPrice(totalPriceWithoutTax.toFixed(2))}
        priceSecondText={convertPrice(totalPrice.toFixed(2))}
      />
      {profileData.id !== null && (<Button
        className={"points-btn"}
        onClick={handleDiscountClick}
        disabled={isButtonDisabled}
      >
        <div className="coin-box">
          <img src={coinIcon} alt="Coin icon"/>
          <span>{points ? points : "0"}</span>
        </div>
        <span>USE POINTS</span>
      </Button>)

      }
      <TextLineText
        spanTextOne={"Sub total with discount:"}
        spanTextTwo={"With tax and discount:"}
        priceFirstText={
          isButtonDisabled ?
            <>
              {convertPrice(priceWithDiscount.toFixed(2))}
            </>
            :
            <>
              {convertPrice(totalPriceWithoutTax.toFixed(2))}
            </>
        }
        priceSecondText={
          isButtonDisabled ?
            <>
              {convertPrice(finalPrice.toFixed(2))}
            </>
            :
            <>
              {convertPrice(totalPrice.toFixed(2))}
            </>

        }
      />
      {/*this is going to send the order: to the endpoint /api/v1/orders */}
      <Button
        disabled={!isTableValid || status}
        onClick={addOrder}
        className={"confirm-order"}
        spanTextOne={"Sub total with discount"}
        text={isLoading ? "Loading..." : error ? error : status || "Confirm Order"}
      />
    </div>
  )
}
export default ReceiptOverview;

