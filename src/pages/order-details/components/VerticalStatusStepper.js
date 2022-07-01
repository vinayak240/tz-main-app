import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import { StepConnector } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Check } from "@material-ui/icons";

const StatusConnector = withStyles({
  vertical: {
    padding: "0px",
    marginLeft: "8px",
  },
})(StepConnector);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

export default function VerticalStatusStepper(props) {
  const classes = useStyles();
  const statuses = props.statusMap.reverse();

  return (
    <div className={classes.root}>
      <Stepper
        style={{
          padding: "6px",
          marginTop: "15px",
          borderTop: "1px solid lightgray",
          paddingTop: "12px",
        }}
        activeStep={statuses.length}
        orientation="vertical"
        connector={<StatusConnector />}
      >
        {statuses.map((status, idx) => (
          <Step key={status.label}>
            <StepLabel
              optional={
                <Typography style={{ fontSize: "0.64rem" }} variant="caption">
                  {status.desc}
                </Typography>
              }
              icon={
                <Check
                  style={{
                    backgroundColor: "#88b988",
                    color: "white",
                    borderRadius: "50%",
                    zIndex: 1,
                    fontSize: 18,
                  }}
                />
              }
            >
              <span
                style={{
                  fontFamily: "'Proxima Nova'",
                }}
              >
                {idx + 1 + ". " + status.label}
              </span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
