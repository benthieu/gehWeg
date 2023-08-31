import { useContext, useEffect } from 'react';
import StateContext from '../state/state.context';

export function OfferList() {
  const { offers } = useContext(StateContext);
  useEffect(() => {
    console.log('offers', offers);
  }, [offers]);

  return (
    <div>
      <h3>Angebote</h3>
      <ul>
        {offers.map((offer, index) => {
          return <li key={index}>offer: {offer.description}</li>;
        })}
      </ul>
    </div>
  );
}

export default OfferList;
