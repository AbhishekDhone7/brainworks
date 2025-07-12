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
  const [visibleColumns, setVisibleColumns] = useState(columns.map((col) => col.field));
  const [sortConfig, setSortConfig] = useState({ field: null, direction: null });
  const [filters, setFilters] = useState({});
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [activeFilterMenu, setActiveFilterMenu] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});

  const columnSelectorRef = useRef(null);
  const filterMenuRef = useRef(null);
  const resizingColRef = useRef(null);

  useEffect(() => {
    const savedWidths = JSON.parse(localStorage.getItem("customTableWidths") || "{}");
    setColumnWidths(savedWidths);
  }, []);

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

  const handleResizeStart = (e, field) => {
    resizingColRef.current = {
      startX: e.clientX,
      startWidth: columnWidths[field] || e.target.parentElement.offsetWidth,
      field,
    };
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", stopResize);
  };

  const handleResize = (e) => {
    if (!resizingColRef.current) return;
    const { startX, startWidth, field } = resizingColRef.current;
    const delta = e.clientX - startX;
    const newWidth = Math.max(60, startWidth + delta);
    const updatedWidths = { ...columnWidths, [field]: newWidth };
    setColumnWidths(updatedWidths);
    localStorage.setItem("customTableWidths", JSON.stringify(updatedWidths));
  };

  const stopResize = () => {
    document.removeEventListener("mousemove", handleResize);
    document.removeEventListener("mouseup", stopResize);
    resizingColRef.current = null;
  };

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
      const cleanedValue = String(value).replace(/[^\d.-]/g, "");
      const num = parseFloat(cleanedValue);
      if (!isNaN(num)) return num;
      const date = new Date(value);
      if (!isNaN(date.getTime())) return date.getTime();
      return String(value).toLowerCase();
    };

    return [...filteredRows].sort((a, b) => {
      const aValue = getSortValue(a);
      const bValue = getSortValue(b);
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredRows, sortConfig, columns]);

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
            <div className="column-selector">
              {columns.map((col) => (
                <div key={col.field} className="hover-box" style={{ display: "flex", gap: "12px" }}>
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.field)}
                    onChange={() => toggleColumn(col.field)}
                    style={{ width: "14px" }}
                  />
                  <label>{col.headerName || col.field}</label>
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
                <th
                  key={col.field}
                  className="column-header"
                  style={{
                    width: columnWidths[col.field]
                      ? `${columnWidths[col.field]}px`
                      : "150px", // default width
                  }}
                >
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
                    </div>
                  </div>

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
                        <button onClick={() => applySort(col.field, "desc")}>
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

                  <div
                    className="column-resizer"
                    onMouseDown={(e) => handleResizeStart(e, col.field)}
                  />
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
