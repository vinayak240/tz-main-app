import React from "react";

export default function Offer(props) {
  const { offer } = props;
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #f4f4f5",
        padding: "20px 16px",
      }}
    >
      <div>
        <span
          style={{
            background: "#d8ebfb",
            padding: "8px",
            fontWeight: "600",
            border: "1px dashed",
          }}
        >
          {offer.code}
        </span>
        {/* APPLY BTN HERE */}
      </div>
      <p>{offer.label_text}</p>
      <p>{offer.desc}</p>
      {offer.conditions?.length > 0 && (
        <div>
          <p>Terms and conditiions</p>
          <uk>
            {offer.conditions.map((condtn) => (
              <li>{condtn.label_text}</li>
            ))}
          </uk>
        </div>
      )}
    </div>
  );
}
