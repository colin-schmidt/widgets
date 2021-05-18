import React, { useState } from "react";
import Accordion from "./components/Accordion";
import Search from "./components/Search";
import Dropdown from "./components/Dropdown";

//This static array is passed into the App component as a prop below for the accordion component
const items = [
  {
    title: "What is React?",
    content: "React is a front end JS framework.",
  },
  {
    title: "Why use React?",
    content: "React is a favorite JS library among engineers.",
  },
  {
    title: "How do you use React?",
    content: "You use React by creating components.",
  },
];

const options = [
  {
    label: "The Color Red",
    value: "red",
  },
  {
    label: "The Color Green",
    value: "green",
  },
  {
    label: "A Shade of Blue",
    value: "blue",
  },
];

export default () => {
  const [selected, setSelected] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(true);
  return (
    <div>
      {/* <Accordion items={items} />{" "} */}
      {/* <-- the above array [items] is passed to Accordion as a prop*/}
      <button onClick={() => setShowDropdown(!showDropdown)}>
        Dropdown Toggle
      </button>
      {showDropdown ? (
        <Dropdown
          //The following are props to pass values from App to Dropdown:
          selected={selected}
          onSelectedChange={setSelected}
          options={options}
        />
      ) : null}
      {/* the above array [items] is passed to Dropdown as a prop */}
    </div>
  );
};

/* 
I could write above code like this:

            const App = () => {
            return (
                <div>
                <Accordion />
                </div>
            );
            };

            export default App;

But because the content of the App component are so minimal, Grider does it all in the export statement
I'm just writing the App component inside the export default.
*/
