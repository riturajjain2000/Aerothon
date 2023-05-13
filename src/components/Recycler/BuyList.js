import React, { useState, useEffect } from 'react';
import { database } from '../../firebase';



function BuyList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsRef = database.ref('items');

    itemsRef.on('value', (snapshot) => {
      const items = [];

      snapshot.forEach((childSnapshot) => {
        const item = {
          id: childSnapshot.key,
          ...childSnapshot.val(),
        };

        items.push(item);
      });

      setItems(items);
    });
  }, []);

  return (
    <div>
      <h2>Parts for sale:</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            {!item.sold && <button>Buy</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BuyList;
