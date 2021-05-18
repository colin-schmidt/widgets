import React, { useState, useEffect, useRef } from "react";
//below I pass the options prop destructed into the Dropdown component
const Dropdown = ({ options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const [color, setColor] = useState("");

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener("click", onBodyClick, { capture: true });
    //below clean up function removes onBodyClick from click event
    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const renderedOptions = options.map((option) => {
    //below logic prevents the selected value from being rendered twice
    if (option.value === selected.value) {
      return null;
    }
    return (
      <div
        key={option.value}
        onClick={() => {
          onSelectedChange(option);
        }}
        className="item"
      >
        {option.label}
      </div>
    );
  });
  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">Select a color</label>
        <div
          //below onClick switches open to true or false
          onClick={() => {
            setOpen(!open);
          }}
          // if open is true, then add 'visible active' classes, if not, empty string
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
      <div style={{ color: { color } }}>this is where the color goes</div>
    </div>
  );
};

/*
if ({selected.label} === 'A Shade of Blue') {
  setColor('blue')
} else if ({selected.label} === 'The Color Red') {
  setColor('red')
} else if ({selected.label} === 'The Color Green') {
  setColor('green')
}
*/
export default Dropdown;
