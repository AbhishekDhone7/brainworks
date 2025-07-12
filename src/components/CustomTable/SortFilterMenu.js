import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaDown,
  faSortAlphaUp,
  faSortAmountDown,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";

const SortFilterMenu = ({
  field,
  filterValue,
  onFilterChange,
  onSort,
  refProp,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const isDateField = ["date", "createdAt", "updatedAt", "startDate", "endDate"].includes(
    field.toLowerCase()
  );

  const handleDateFilter = () => {
    onFilterChange(field, { startDate, endDate });
  };

  return (
    <div className="filter-sort-menu" ref={refProp}>
      <div className="filter-section">
        {isDateField ? (
          <>
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button onClick={handleDateFilter}>Apply Date Filter</button>
          </>
        ) : (
          <input
            type="text"
            placeholder="Filter"
            value={filterValue || ""}
            onChange={(e) => onFilterChange(field, e.target.value)}
          />
        )}
      </div>
      <div className="sort-section">
        <button onClick={() => onSort(field, "asc")}>
          <FontAwesomeIcon
            icon={
              isDateField || field.toLowerCase().includes("amount")
                ? faSortAmountDown
                : faSortAlphaDown
            }
          />{" "}
          Ascending
        </button>
        <button onClick={() => onSort(field, "desc")}>
          <FontAwesomeIcon
            icon={
              isDateField || field.toLowerCase().includes("amount")
                ? faSortAmountUp
                : faSortAlphaUp
            }
          />{" "}
          Descending
        </button>
      </div>
    </div>
  );
};

export default SortFilterMenu;
