import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

const rowsPerPageOptions = [10, 25, 50];
const Tables = () => {
  const [sort, setSort] = useState({ column: null, direction: "desc" });
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, "Data");

    onValue(dataRef, (snapshot) => {
      const firebaseData = snapshot.val();
      console.log(firebaseData);

      if (firebaseData) {
        const dataArray = Object.keys(firebaseData).map((key) => {
          const obj = firebaseData[key];
          Object.keys(obj).forEach((prop) => {
            if (!isNaN(obj[prop])) {
              obj[prop] = Math.round(obj[prop] * 100) / 100;
            }
          });
          return {
            id: key,
            ...obj,
          };
        });

        setData(dataArray);
      }
    });
  }, [fetch]);

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
    if (typeof aValue === "string" && typeof bValue === "string") {
      if (sort.direction === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    } else {
      if (sort.direction === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
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

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    if (query.length === 0) setFetch(!fetch);
    const results = data.filter((row) => {
      return Object.keys(row).some((key) =>
        row[key].toString().toLowerCase().includes(query)
      );
    });

    setData(results);
  };

  return (
    <>
      <input type="text" placeholder="Search..." onChange={handleSearch} />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column} onClick={() => handleSort(column)}>
                  {column}
                  {sort.column === column
                    ? sort.direction === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
        {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
          
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>{item[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

const Search = () => {
  return (
    <div className={styles.container}>
      <Tables />
    </div>
  );
};

export default Search;
