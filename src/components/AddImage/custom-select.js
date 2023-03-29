import React from "react";
import Select, { components } from "react-select";
import Button from "react-bootstrap/Button";
import classes from "./custom-select.module.css";

const Menu = (props) => {
  return (
    <components.Menu {...props}>
      <div>
        <div>{props.children}</div>
      </div>
      <button
        className={classes.createBoard}
        onClick={props.selectProps.handleOpen}
      >
        Create board
      </button>
    </components.Menu>
  );
};

const Option = (props) => {
  return (
    <components.Option {...props}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>{props.children}</div>
        {/* <div>
            <Button
              variant="danger"
              onClick={props.selectProps.saveToBoardHandler}
            >
              Save
            </Button>
          </div> */}
      </div>
    </components.Option>
  );
};

const CustomSelect = ({ options, openHandler, onChange, category, onSave }) => {
  return (
    <div>
      <Select
        options={options}
        components={{ Menu, Option }}
        handleOpen={openHandler}
        onChange={onChange}
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        defaultValue={category ? category : ""}
        saveToBoardHandler={onSave}
      />
    </div>
  );
};
export default React.memo(CustomSelect);
