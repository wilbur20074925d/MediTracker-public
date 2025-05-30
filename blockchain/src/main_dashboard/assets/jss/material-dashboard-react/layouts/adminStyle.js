import {
  drawerWidth,
  transition,
  container
} from '../../material-dashboard-react.js';

// "assets/jss/material-dashboard-react.js";
const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
    backgroundColor: "#F8FAFC"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
    backgroundColor: "#F8FAFC"
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)",
    backgroundColor: "#F8FAFC"
  },
  container,
  map: {
    marginTop: "70px"
  }
});

export default appStyle;
