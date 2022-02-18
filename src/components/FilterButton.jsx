import React from "react";
import { ReactComponent as EyeOff } from "../icons/eye-off.svg";
import { ReactComponent as Eye } from "../icons/eye.svg";
import { ReactComponent as List } from "../icons/align-justify.svg";

const FilterButtons = ({ setFilterValue }) => {
  return (
    <div className="btn-container">
      <a href="#~">
        <List className="eye" onClick={() => setFilterValue("ALL")} />
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a href="#~">
        <Eye onClick={() => setFilterValue("ACTIVE")} />
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a href="#~">
        <EyeOff onClick={() => setFilterValue("COMPLETED")} />
      </a>
    </div>
  );
};

export default FilterButtons;
