import React, { useState } from "react";

const ShowMoreText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? text : text?.slice(0, 200);

  return (
    <div>
      <p>
        {displayText}
        {text?.length > 200 && !isExpanded && "..."}
      </p>
      {text?.length > 200 && (
        <button id="myseemoreBtn" onClick={toggleExpanded}>
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default ShowMoreText;
