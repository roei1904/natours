import axios from 'axios';
const stripe = Stripe(
  'pk_test_51SvxV02aKpRAp2ToBD6ZtBvP98OEiYTHXQg5oNBQOzkhSAD2YiQ77tACjDjLT1ORHu60nWZxYfLgUaNXH9JKMaAH00kjj7IpmW',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from backend
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    const sessionData = session.data;
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: sessionData.session.id,
    });
  } catch (err) {
    err;
    alert('Error booking the tour. Please try again.');
  }
};
