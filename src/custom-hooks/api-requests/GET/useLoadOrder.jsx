import {useEffect} from 'react';
import axios from 'axios';
import resetOrderAfterStatus from "../../../helpers/resetOrderAfterStatus.js";

function useLoadOrder(setCurrentOrder, setStatus, setCurrentLocation, token, status, isAuthenticated) {
  const baseUrl = import.meta.env.VITE_API_URL;

  const localOrderReference = localStorage.getItem("orderReference");
  const localOrderId = localStorage.getItem("id");

  useEffect(() => {
    async function fetchOrder() {
      if (localOrderReference) {
        try {
          const response = await axios.get(`${baseUrl}/api/v1/orders/orderreference`, {
            params: {orderReference: localOrderReference},
          });
          const data = response.data;
          resetOrderAfterStatus("ORDER_PAYED", "orderReference", intervalId, setCurrentOrder, setCurrentLocation, setStatus, data)
        } catch (e) {
          setCurrentOrder([])
          console.error(e);
        }

      } else if (localOrderId && isAuthenticated) {
        try {
          const response = await axios.get(`${baseUrl}/api/v1/orders/${localOrderId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data;
          resetOrderAfterStatus("ORDER_PAYED", "id", intervalId, setCurrentOrder, setCurrentLocation, setStatus, data)
        } catch (e) {
          console.error(e.response.data);
        }
      }
    }

    // Initial startup
    void fetchOrder();

    // Set up interval for updates every 10 seconds
    const intervalId = setInterval(fetchOrder, 10000);
    // Clean up the interval when no order is found in the localstorage
    if (localOrderReference == null && localOrderId === null) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, [token, status, isAuthenticated]);
};

export default useLoadOrder;
