import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PaymentCheckout from "../../components/client/checkoutComponents/PaymentCheckout";
import PaymentSuccess from "../../components/client/checkoutComponents/PaymentSuccess";
import { history } from "../../utils/history";

export default function CheckoutPage() {
  const [timer, setTimer] = useState(300000);

  const { bookingData, paymentSuccess } = useSelector(
    (state) => state.CheckoutReducer
  );
  const { seatBooking, pointBooking, userBooking } = bookingData;
  let minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
  let m = minutes > 9 ? minutes : "0" + minutes;
  let seconds = Math.floor((timer % (1000 * 60)) / 1000);
  let s = seconds > 9 ? seconds : "0" + seconds;
  let thoiGianGiuVe = m + ":" + s;

  useEffect(() => {
    let x = setInterval(function () {
      if (timer > 0) {
        setTimer(timer - 1000);
      }
      if (timer < 0) {
        clearInterval(x);
      }
    }, 1000);
    return () => {
      clearInterval(x);
    };
  }, [timer]);

  if (seatBooking && pointBooking && userBooking) {
    return <PaymentCheckout time={thoiGianGiuVe} timer={timer} />;
  } else if (paymentSuccess.id) {
    return <PaymentSuccess />;
  } else {
    history.push("/");
    window.location.reload();
  }
}
