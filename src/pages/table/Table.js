import { Button } from "@material-ui/core";
import React from "react";

function Table(props) {
  return (
    <div>
      {/* In Bold.. */}
      <div>
        <h3>{props.table?.table_id}</h3>
      </div>
      <div>{props.table?.session?.passcode}</div>
      <div>{props.table?.session?.status}</div>
      <div>{props.table?.orders?.length}</div>
      <div>
        <Button>Check Out</Button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  table: clone(state.table),
  charges: clone(state.restaurant.settings.charges),
  common: clone(state.common),
});

export default connect(mapStateToProps)(Table);
