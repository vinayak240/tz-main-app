import React from "react";
import { connect } from "react-redux";
import { tableError } from "../../../redux/actions/table";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
  }

  // This method is called if any error is encountered
  componentDidCatch() {
    this.props.tableError();
  }

  // This will render this component wherever called
  render() {
    return this.props.children;
  }
}

export default connect(null, { tableError })(ErrorBoundary);
