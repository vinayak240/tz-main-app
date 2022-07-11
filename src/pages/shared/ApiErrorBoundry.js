import React from "react";
import { connect } from "react-redux";
import { setApiStatus } from "../../redux/actions/comman";
import { API_STATUS, API_TYPES } from "../../enums/api_status";
import { SomethingWentWrong } from "./SomethingWentWrong";
import { clone } from "ramda";

class ApiErrorBoundry extends React.Component {
  constructor(props) {
    super(props);
  }

  // This method is called if any error is encountered
  componentDidCatch() {
    this.props.setApiStatus(this.props.api_type, API_STATUS.ERROR);
  }

  componentWillUnmount() {
    this.props.setApiStatus(API_TYPES.NONE, API_STATUS.NONE);
  }

  // This will render this component wherever called
  render() {
    return this.props.api_status?.type === this.props.api_type ? (
      this.props.api_status.status === API_STATUS.ERROR ? (
        <SomethingWentWrong />
      ) : this.props.api_status.status === API_STATUS.LOADING ? (
        this.props.skeleton
      ) : (
        this.props.children
      )
    ) : (
      this.props.children
    );
  }
}

const mapStateToProps = (state) => ({
  api_status: clone(state.common?.api_status),
});

export default connect(mapStateToProps, { setApiStatus })(ApiErrorBoundry);
