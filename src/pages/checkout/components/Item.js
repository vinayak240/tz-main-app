import { Typography } from "@material-ui/core";
import React from "react";

export function Item(props) {
  // const { item } = {
  //   item: {
  //     _id: "60e31f70e8560509888787779847985449599ea",
  //     itemCount: 2,
  //     versions: [
  //       {
  //         itemCount: 1,
  //         totalCost: 130,
  //         custumization_arr: [],
  //       },
  //       {
  //         itemCount: 1,
  //         totalCost: 280,
  //         custumization_arr: [
  //           {
  //             _id: "60e3v75877571f70e85605098434749599eb",
  //             custumization_name: "Add Ons",
  //             custum_type: "0",
  //             options: [
  //               {
  //                 _id: "60e31f70e8560934v8f765059849804749599ec",
  //                 food_type: "veg",
  //                 option: "Hot Choco Sauce",
  //                 option_type: "add",
  //                 option_price: "50",
  //               },
  //               {
  //                 _id: "60e31f65c68570e887435609340504749599ec",
  //                 food_type: "veg",
  //                 option: "Blueberry Sauce",
  //                 option_type: "add",
  //                 option_price: "50",
  //               },
  //               {
  //                 _id: "60e31f70e856g79670934059849804749599ec",
  //                 food_type: "veg",
  //                 option: "Extra Cream",
  //                 option_type: "add",
  //                 option_price: "50",
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //     type: "item",
  //     item_name: "Cheese Cake",
  //     item_price: "130",
  //     custumization_arr: [
  //       {
  //         _id: "60e3v75877571f70e85605098434749599eb",
  //         custumization_name: "Add Ons",
  //         custum_type: "0",
  //         options: [
  //           {
  //             _id: "60e31f65c68570e887435609340504749599ec",
  //             food_type: "veg",
  //             option: "Blueberry Sauce",
  //             option_type: "add",
  //             option_price: "50",
  //           },
  //           {
  //             _id: "60e31f70e8560934v8f765059849804749599ec",
  //             food_type: "veg",
  //             option: "Hot Choco Sauce",
  //             option_type: "add",
  //             option_price: "50",
  //           },
  //           {
  //             _id: "60e31f70e856g79670934059849804749599ec",
  //             food_type: "veg",
  //             option: "Extra Cream",
  //             option_type: "add",
  //             option_price: "50",
  //           },
  //           {
  //             _id: "60e31f70e856093405988796g49804749599ec",
  //             food_type: "veg",
  //             option: "Hazel Nuts",
  //             option_type: "add",
  //             option_price: "50",
  //           },
  //           {
  //             _id: "60e31f70e85609378y7t764059849804749599ec",
  //             food_type: "veg",
  //             option: "Almonds",
  //             option_type: "add",
  //             option_price: "50",
  //           },
  //           {
  //             _id: "60e31f70e85609340uyyi659849804749599ec",
  //             food_type: "veg",
  //             option: "Candy Poppers",
  //             option_type: "add",
  //             option_price: "50",
  //           },
  //         ],
  //       },
  //     ],
  //     food_type: "egg_only",
  //   },
  // };

  const { item } = props;
  return (
    <div>
      {item.versions.map((v) => (
        <li>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "4px 0px",
            }}
          >
            <Typography
              style={{
                fontSize: "0.8rem",
                fontFamily: "'Proxima Nova'",
                //   fontWeight: "500",
                flexBasis: "80%",
              }}
            >
              {item.item_name}
              {v.custumization_arr.length === 0
                ? ""
                : ` [ ${v.custumization_arr
                    .map((cust) => {
                      return cust.options.map((opt) => opt.option).join(", ");
                    })
                    .join(" | ")} ] `}{" "}
              x {v.itemCount}
            </Typography>
            <Typography
              style={{
                fontSize: "0.8rem",
                fontFamily: "'Proxima Nova'",
                //   fontWeight: "500",
              }}
            >
              <span>&#8377;</span>
              {v.totalCost}
            </Typography>
          </div>
        </li>
      ))}
    </div>
  );
}
