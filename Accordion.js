import React, { useState } from "react";

// below instead of passing "props" as arg, we destruct {items}
const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  //helper function for when we click on a title to expand that accordion.
  //This needs to be inside of an fn comp, whereas it can be outside of a class-based comp.
  const onTitleClick = (index) => {
    setActiveIndex(index);
  };

  //renderedItems will map over the items array passed into Accordion as a prop from App
  const renderedItems = items.map((item, index) => {
    //below is a ternary op to decide whether to dropdown.  Clicking a title sets activeIndex
    //equal to that index, then adds active semantic ui class to the index thats equal to activeIndex
    const active = index === activeIndex ? "active" : "";
    return (
      //below we return a React.Fragment instead of a div bc Semantic UI something
      <React.Fragment key={item.title}>
        {/* two divs, first with dropdown icon then the title from the array in App
                    second with content from the same array */}
        <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });
  // below we return the results from the above fn that maps over the array in App
  return (
    <div>
      <div className="ui styled accordion">{renderedItems}</div>
    </div>
  );
};

export default Accordion;
