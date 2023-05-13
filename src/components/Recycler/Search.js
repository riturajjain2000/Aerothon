import React, { useState } from "react";
import { Dataset } from "../../Dataset";
import styles from "./Search.module.css";

const Table = ({ data }) => {
  const [sort, setSort] = useState({ column: null, direction: "desc" });
  const columns = [
    "Age (years)",
    "Condition",
    "Manufacturer",
    "Part Name",
    "Material Composition",
    "Recycling Rate (%)",
    "Remanufacturing Potential (%)",
    "Life Cycle Assessment Score",
    "Remanufacturing Potential",
    "Life Cycle Assessment",
    "Renewable Material Content (%)",
    "Potential Use Cases",
    "Location",
    "Aircraft Model",
    "Carbon Footprint Saved (kg CO2e)",
    "Water Usage Saved (liters)",
    "Landfill Waste Saved (kg)",
    "Energy Consumption Saved (kWh)",
    "Toxicity Score Difference",
    "New Parts Carbon Footprint (kg CO2e)",
    "Recycled Parts Carbon Footprint (kg CO2e)",
    "Water Usage - New Parts (liters)",
    "Water Usage - Recycled Parts (liters)",
    "Landfill Waste - New Parts (kg)",
    "Landfill Waste - Recycled Parts (kg)",
    "Energy Consumption - New Parts (kWh)",
    "Energy Consumption - Recycled Parts (kWh)",
    "Toxicity Score - New Parts",
    "Toxicity Score - Recycled Parts",
  ];

  const sortedData = data.sort((a, b) => {
    if (sort.column === null) {
      return 0;
    }
    const aValue = a[sort.column];
    const bValue = b[sort.column];
    if (sort.direction === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const handleSort = (column) => {
    if (sort.column === column) {
      setSort({
        ...sort,
        direction: sort.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSort({ column, direction: "asc" });
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} onClick={() => handleSort(column)}>
              {column}
              {sort.column === column
                ? sort.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column}>{item[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SearchData = ({ data, setSearchResults }) => {
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const results = data.filter((item) => {
      return (
        item["Part Name"].toLowerCase().includes(query) ||
        item["Material Composition"].toLowerCase().includes(query) ||
        item["Age (years)"].toLowerCase().includes(query) ||
        item["Condition"].toLowerCase().includes(query) ||
        item["Location"].toLowerCase().includes(query) ||
        item["Manufacturer"].toLowerCase().includes(query) ||
        item["Aircraft Model"].toLowerCase().includes(query)
      );
    });
    setSearchResults(results);
  };

  return <input type="text" placeholder="Search..." onChange={handleSearch} />;
};

const Search = () => {
  const [searchResults, setSearchResults] = useState(Dataset);

  return (
    <div className={styles.container}>
      <SearchData data={Dataset} setSearchResults={setSearchResults} />
      <Table data={searchResults} />
    </div>
  );
};

export default Search;
