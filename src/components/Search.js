import React, { useState } from 'react';
import { Dataset } from '../Dataset';


function List({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <span>{item['Part Name']}</span>
          {/* <span>{item['Material Composition']}</span>
          <span>{item['Age (years)']}</span>
          <span>{item['Condition']}</span>
          <span>{item['Location']}</span>
          <span>{item['Manufacturer']}</span>
          <span>{item['Aircraft Model']}</span> */}
        </li>
      ))}
    </ul>
  );
}

function SearchData({ items, setSearchResults }) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch(event) {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const results = items.filter(item => {
      return (
        item['Part Name'].toLowerCase().includes(value) //||
        // item['Material Composition'].toLowerCase().includes(value) ||
        // item['Age (years)'].toLowerCase().includes(value) ||
        // item['Condition'].toLowerCase().includes(value) ||
        // item['Location'].toLowerCase().includes(value) ||
        // item['Manufacturer'].toLowerCase().includes(value) ||
        // item['Aircraft Model'].toLowerCase().includes(value)
      );
    });

    setSearchResults(results);
  }

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearch} />
      <button onClick={() => setSearchResults(items)}>Clear</button>
    </div>
  );
}

function Search() {
  const [searchResults, setSearchResults] = useState(Dataset);

  return (
    <div>
      <h1>Aircraft Parts List</h1>
      <SearchData items={Dataset} setSearchResults={setSearchResults} />
      <List items={searchResults} />
    </div>
  );
}

export default Search;
