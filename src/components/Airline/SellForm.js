import React, { useState } from 'react';
import { database } from '../../firebase';


function SellForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    database.ref('items').push({
      title: title,
      description: description,
      price: price,
      sold: false,
    });
    

    setTitle('');
    setDescription('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      ></textarea>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
      <button type="submit">Sell</button>
    </form>
  );
}

export default SellForm;
