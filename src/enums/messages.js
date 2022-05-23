/**
 * @summary All the defined message types
 */
const MESSAGE_TYPE = {
  REQUEST_MESSAGE: "REQUEST_MESSAGE",
  ERROR_MESSAGE: "ERROR_MESSAGE",
  RESPONSE_MESSAGE: "RESPONSE_MESSAGE",
};

const API_RESPONSE = {
  PARTIAL: "API_PARTIAL", //the workflow is not completed
  COMPLETE: "API_COMPLETE", //the workflow is completed
  IGNORE: "API_IGNORE", //the workflow is not completed and there is no payload
};

module.exports = { MESSAGE_TYPE, API_RESPONSE };
