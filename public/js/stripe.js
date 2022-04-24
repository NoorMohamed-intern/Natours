import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51KrF4OSBx1fAtecdsMMCTOAkCN5tvOZVHeWZ3Y6ycjXfvRRZVpJsRKO0qXdh9nt3INkQU4pZvLPh1eYxBThZkKLA00NHbql4cD'
  );
  try {
    // 1. Get checkout session from the API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
