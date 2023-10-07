import React, { useState } from 'react';

const Filter = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showDropdown, setMoreFiltersOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleMoreFilters = () => {
    setMoreFiltersOpen(!showDropdown);
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-left align-items-center gap-5">
          {/* Present Class Dropdown */}
          <div className="col-md-3">
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
              >
                Select the present class
              </button>
              <div
                className={`dropdown-menu${isDropdownOpen ? ' show' : ''}`}
              >
                <a className="dropdown-item" href="#">
                  --Select the present class--
                </a>
                {/* Add other class options here */}
              </div>
            </div>
          </div>

          {/* More Filters */}
          <div className="col-md-3">
            <a
              className="btn btn-primary"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              role="button"
              aria-controls="offcanvasExample"
              onClick={toggleMoreFilters}
            >
              More Filter
            </a>
          </div>
        </div>
      </div>

      {/* Offcanvas for More Filters */}
      <div className={`offcanvas offcanvas-start${showDropdown ? ' show' : ''}`} tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <button type="button" className="btn-close text-reset text-primary" data-bs-dismiss="offcanvas" aria-label="Close" onClick={toggleMoreFilters} />
        </div>
        <div className="offcanvas-body">
          <div className="row">
            {/* Row 1 */}
            <div className="col-md-6">
              <h2>Row 1</h2>
              <div className="btn-group dropend">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true">
                  Option 1
                </button>
                <ul className="dropdown-menu">
                  {/* Dropdown menu links */}
                </ul>
              </div>
            </div>

            {/* Row 2 */}
            <div className="col-md-6">
              <h2>Row 2</h2>
              <div className="btn-group dropend">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true">
                  Option 2
                </button>
                <ul className="dropdown-menu">
                  {/* Dropdown menu links */}
                </ul>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="row">
            <div className="col-md-6">
              <h2>Row 3</h2>
              <div className="btn-group dropend">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true">
                  Option 3
                </button>
                <ul className="dropdown-menu">
                  {/* Dropdown menu links */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;