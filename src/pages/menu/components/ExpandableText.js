import { Typography } from "@material-ui/core";
import React, { useState } from "react";

export default function ExpandableText(props) {
  const [isExpanded, setIsExpanded] = useState(props.children.length < 90);
  const styleObj = !isExpanded
    ? {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
      }
    : {};
  return (
    <div>
      <Typography style={styleObj} {...props}>
        {props.children}
      </Typography>
      {!isExpanded && (
        <Typography
          onClick={() => setIsExpanded(true)}
          style={{ fontWeight: "bold" }}
        >
          more
        </Typography>
      )}
    </div>
  );
}
