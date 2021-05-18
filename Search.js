import axios from "axios";
import React, { useState, useEffect } from "react";

const Search = () => {
  const [term, setTerm] = useState("programming");
  const [results, setResults] = useState([]);

  //first arg of useEffect is always a function
  //second arg controls when the first arg is executed, can be...
  //1. [] which only will run the 1st arg at initial render
  // 2. nothing at all! which will run at init render and after EVERY render - rare like mr. clean w hair
  //3. [anythg inside] which runs at init render and every subseq render where data changed

  //Not allowed to mark first arg of useEffect as async.
  useEffect(() => {
    //helper bc async await doesnt work on useEffect:
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setResults(data.query.search);
    };

    //below solves the 500ms lag in initial render of results
    if (term && !results.length) {
      search();
    } else {
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 500);

      //this is the function that the first arg of useEffect returns:
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term]);

  //just like renderedItems in Accordion, renderedResults will map over data.query.search
  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            href={`https://en.wikipedia.org/?curid=${result.pageid}`}
            className="ui button"
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          {/* did below to get rid of ugly formatting in api call results but by taking a string from a
          3rd party, like the wiki api, you can introduce a security risk, like an xss attack
          cross site scripting - accidentally rendering naughty code from another source*/}
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            className="input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          {/* onChange above is setting term = the value of the input, aka what you type in */}
        </div>
      </div>
      {/* rendering the results of the map above: */}
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
