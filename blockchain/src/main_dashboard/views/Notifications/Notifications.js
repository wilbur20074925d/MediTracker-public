/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import SnackbarContent from "../../components/Snackbar/SnackbarContent.js";
import Snackbar from "../../components/Snackbar/Snackbar.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";

const useStyles = makeStyles({
  card: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.05)",
    borderRadius: "12px"
  },
  cardHeader: {
    backgroundColor: "#1A73E8",
    color: "#FFFFFF",
    padding: "20px"
  },
  cardTitle: {
    color: "#1A73E8",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "600",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  cardCategory: {
    color: "#5F6368",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  button: {
    backgroundColor: "#1A73E8",
    color: "#FFFFFF",
    '&:hover': {
      backgroundColor: "#1557B0"
    }
  },
  snackbarContent: {
    backgroundColor: "#FFFFFF",
    color: "#1A73E8",
    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.05)",
    borderRadius: "12px",
    borderLeft: "4px solid #1A73E8"
  }
});

export default function Notifications() {
  const classes = useStyles();
  const [tl, setTL] = React.useState(false);
  const [tc, setTC] = React.useState(false);
  const [tr, setTR] = React.useState(false);
  const [bl, setBL] = React.useState(false);
  const [bc, setBC] = React.useState(false);
  const [br, setBR] = React.useState(false);
  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });
  const showNotification = place => {
    switch (place) {
      case "tl":
        if (!tl) {
          setTL(true);
          setTimeout(function() {
            setTL(false);
          }, 6000);
        }
        break;
      case "tc":
        if (!tc) {
          setTC(true);
          setTimeout(function() {
            setTC(false);
          }, 6000);
        }
        break;
      case "tr":
        if (!tr) {
          setTR(true);
          setTimeout(function() {
            setTR(false);
          }, 6000);
        }
        break;
      case "bl":
        if (!bl) {
          setBL(true);
          setTimeout(function() {
            setBL(false);
          }, 6000);
        }
        break;
      case "bc":
        if (!bc) {
          setBC(true);
          setTimeout(function() {
            setBC(false);
          }, 6000);
        }
        break;
      case "br":
        if (!br) {
          setBR(true);
          setTimeout(function() {
            setBR(false);
          }, 6000);
        }
        break;
      default:
        break;
    }
  };
  return (
    <Card className={classes.card}>
      <CardHeader className={classes.cardHeader}>
        <h4 className={classes.cardTitle}>Notifications</h4>
        <p className={classes.cardCategory}>
          Handcrafted by our friends from{" "}
          <a
            target="_blank"
            href="https://material-ui-next.com/?ref=creativetime"
            style={{ color: "#FFFFFF" }}
          >
            Material UI
          </a>{" "}
          and styled by{" "}
          <a
            target="_blank"
            href="https://www.creative-tim.com/?ref=mdr-notifications-page"
            style={{ color: "#FFFFFF" }}
          >
            Creative Tim
          </a>
          .
        </p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <h5>Notifications Style</h5>
            <br />
            <SnackbarContent message={"This is a plain notification"} />
            <SnackbarContent
              message={"This is a notification with close button."}
              close
            />
            <SnackbarContent
              message={"This is a notification with close button and icon."}
              close
              icon={AddAlert}
            />
            <SnackbarContent
              message={
                "This is a notification with close button and icon and have many lines. You can see that the icon and the close button are always vertically aligned. This is a beautiful notification. So you don't have to worry about the style."
              }
              close
              icon={AddAlert}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <h5>Notifications States</h5>
            <br />
            <SnackbarContent
              message="INFO - This is a regular notification made with color='info'"
              close
              className={classes.snackbarContent}
            />
            <SnackbarContent
              message="SUCCESS - This is a regular notification made with color='success'"
              close
              className={classes.snackbarContent}
            />
            <SnackbarContent
              message="WARNING - This is a regular notification made with color='warning'"
              close
              className={classes.snackbarContent}
            />
            <SnackbarContent
              message="DANGER - This is a regular notification made with color='danger'"
              close
              className={classes.snackbarContent}
            />
            <SnackbarContent
              message="PRIMARY - This is a regular notification made with color='primary'"
              close
              className={classes.snackbarContent}
            />
          </GridItem>
        </GridContainer>
        <br />
        <br />
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6} style={{ textAlign: "center" }}>
            <h5>
              Notifications Places
              <br />
              <small>Click to view notifications</small>
            </h5>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={8}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Button
                  fullWidth
                  className={classes.button}
                  onClick={() => showNotification("tl")}
                >
                  Top Left
                </Button>
                <Snackbar
                  place="tl"
                  color="info"
                  icon={AddAlert}
                  message="Welcome to MediTracker - Your trusted healthcare supply chain platform."
                  open={tl}
                  closeNotification={() => setTL(false)}
                  close
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Button
                  fullWidth
                  className={classes.button}
                  onClick={() => showNotification("tc")}
                >
                  Top Center
                </Button>
                <Snackbar
                  place="tc"
                  color="info"
                  icon={AddAlert}
                  message="Welcome to MediTracker - Your trusted healthcare supply chain platform."
                  open={tc}
                  closeNotification={() => setTC(false)}
                  close
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Button
                  fullWidth
                  className={classes.button}
                  onClick={() => showNotification("tr")}
                >
                  Top Right
                </Button>
                <Snackbar
                  place="tr"
                  color="info"
                  icon={AddAlert}
                  message="Welcome to MediTracker - Your trusted healthcare supply chain platform."
                  open={tr}
                  closeNotification={() => setTR(false)}
                  close
                />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={8}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Button
                  fullWidth
                  className={classes.button}
                  onClick={() => showNotification("bl")}
                >
                  Bottom Left
                </Button>
                <Snackbar
                  place="bl"
                  color="info"
                  icon={AddAlert}
                  message="Welcome to MediTracker - Your trusted healthcare supply chain platform."
                  open={bl}
                  closeNotification={() => setBL(false)}
                  close
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Button
                  fullWidth
                  className={classes.button}
                  onClick={() => showNotification("bc")}
                >
                  Bottom Center
                </Button>
                <Snackbar
                  place="bc"
                  color="info"
                  icon={AddAlert}
                  message="Welcome to MediTracker - Your trusted healthcare supply chain platform."
                  open={bc}
                  closeNotification={() => setBC(false)}
                  close
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Button
                  fullWidth
                  className={classes.button}
                  onClick={() => showNotification("br")}
                >
                  Bottom Right
                </Button>
                <Snackbar
                  place="br"
                  color="info"
                  icon={AddAlert}
                  message="Welcome to MediTracker - Your trusted healthcare supply chain platform."
                  open={br}
                  closeNotification={() => setBR(false)}
                  close
                />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
}
