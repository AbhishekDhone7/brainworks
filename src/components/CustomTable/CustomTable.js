import React, { useState, useMemo, useRef, useEffect } from "react";
import "./CustomTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faFilter,
  faSortAlphaDown,
  faSortAlphaUp,
  faSortAmountDown,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";

const CustomTable = ({ columns, rows }) => {
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => col.field)
  );
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: null,
  });
  const [filters, setFilters] = useState({});
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [activeFilterMenu, setActiveFilterMenu] = useState(null);

  const columnSelectorRef = useRef(null);
  const filterMenuRef = useRef(null);

  const toggleColumn = (field) => {
    setVisibleColumns((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const toggleFilterMenu = (field) => {
    setActiveFilterMenu((prev) => (prev === field ? null : field));
  };

  const applySort = (field, direction) => {
    setSortConfig({ field, direction });
    setActiveFilterMenu(null);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredRows = useMemo(() => {
    return rows.filter((row) =>
      columns.every((col) => {
        const filterValue = filters[col.field];
        if (!filterValue) return true;
        const rawValue =
          col.valueGetter?.({ row }) ?? row[col.field]?.toString() ?? "";
        return rawValue.toLowerCase().includes(filterValue.toLowerCase());
      })
    );
  }, [filters, rows, columns]);

 const sortedRows = useMemo(() => {
  if (!sortConfig.field) return filteredRows;

  const getSortValue = (row) => {
    const col = columns.find((c) => c.field === sortConfig.field);
    if (!col) return null;

    let value = col.valueGetter ? col.valueGetter({ row }) : row[sortConfig.field];

    // Normalize for sorting
    const num = parseFloat(value);
    if (!isNaN(num) && isFinite(value)) return num;

    const date = new Date(value);
    if (!isNaN(date.getTime())) return date.getTime();

    return String(value).toLowerCase(); // fallback to string compare
  };

  return [...filteredRows].sort((a, b) => {
    const aValue = getSortValue(a);
    const bValue = getSortValue(b);

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });
}, [filteredRows, sortConfig, columns]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        columnSelectorRef.current &&
        !columnSelectorRef.current.contains(e.target)
      ) {
        setShowColumnSelector(false);
      }

      if (filterMenuRef.current && !filterMenuRef.current.contains(e.target)) {
        setActiveFilterMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-table-container">
      <div className="column-controls">
        <div className="column-selector-wrapper" ref={columnSelectorRef}>
          <span
            className="column-icon"
            title="Select Columns"
            onClick={() => setShowColumnSelector((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faSliders} />
          </span>

          {showColumnSelector && (
            <div
              className="column-selector"
            >
              {columns.map((col) => (
                <div 
                style={{
                  width: '100%',
                  display:'flex',
                  gap: "15px",
                  padding: "0 15px"
                }}
                className="hover-box"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.field)}
                    onChange={() => toggleColumn(col.field)}
                    style={{
                        width: '12px',
                        margin: 0,
                    }}
                  />
                  <label
                    key={col.field}
                  >
                    {col.headerName || col.field}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            {columns
              .filter((col) => visibleColumns.includes(col.field))
              .map((col) => (
                <th key={col.field} className="column-header">
                  <div className="header-content">
                    <span onClick={() => handleFilterChange(col.field, "")}>
                      {col.headerName || col.field}
                      {sortConfig.field === col.field &&
                        (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
                    </span>

                    <div className="header-actions">
                      <span
                        className="filter-icon"
                        onClick={() => toggleFilterMenu(col.field)}
                      >
                        <FontAwesomeIcon icon={faFilter} />
                      </span>

                      {activeFilterMenu === col.field && (
                        <div className="filter-sort-menu" ref={filterMenuRef}>
                          <div className="filter-section">
                            <input
                              type="text"
                              placeholder="Filter"
                              value={filters[col.field] || ""}
                              onChange={(e) =>
                                handleFilterChange(col.field, e.target.value)
                              }
                            />
                          </div>

                          <div className="sort-section">
                            <button onClick={() => applySort(col.field, "asc")}>
                              <FontAwesomeIcon
                                icon={
                                  ["amount", "date"].includes(col.field)
                                    ? faSortAmountDown
                                    : faSortAlphaDown
                                }
                              />{" "}
                              Ascending
                            </button>
                            <button
                              onClick={() => applySort(col.field, "desc")}
                            >
                              <FontAwesomeIcon
                                icon={
                                  ["amount", "date"].includes(col.field)
                                    ? faSortAmountUp
                                    : faSortAlphaUp
                                }
                              />{" "}
                              Descending
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, idx) => (
            <tr key={idx}>
              {columns
                .filter((col) => visibleColumns.includes(col.field))
                .map((col) => (
                  <td key={col.field}>
                    {col.renderCell
                      ? col.renderCell({ row })
                      : col.valueGetter
                      ? col.valueGetter({ row })
                      : row[col.field]}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
