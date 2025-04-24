import {
  drawerWidth,
  transition,
  boxShadow,
  defaultFont,
  primaryColor,
  primaryBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor,
  blackColor,
  hexToRgb
} from '../../material-dashboard-react.js';

const sidebarStyle = theme => ({
  drawerPaper: {
    border: "none",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    zIndex: "1",
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      position: "fixed",
      height: "100%"
    },
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
      position: "fixed",
      display: "block",
      top: "0",
      height: "100vh",
      right: "0",
      left: "auto",
      zIndex: "1032",
      visibility: "visible",
      overflowY: "visible",
      borderTop: "none",
      textAlign: "left",
      paddingRight: "0px",
      paddingLeft: "0",
      transform: `translate3d(${drawerWidth}px, 0, 0)`,
      ...transition
    },
    backgroundColor: "#FFFFFF",
    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.05)"
  },
  drawerPaperRTL: {
    [ theme.breakpoints.up("md") ]: {
      left: "auto !important",
      right: "0 !important"
    },
    [ theme.breakpoints.down("sm") ]: {
      left: "0  !important",
      right: "auto !important"
    }
  },
  logo: {
    position: "relative",
    padding: "20px 15px",
    zIndex: "4",
    textAlign: "center",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: "0",
      height: "1px",
      right: "15px",
      width: "calc(100% - 30px)",
      backgroundColor: "rgba(0, 0, 0, 0.05)"
    }
  },
  logoLink: {
    ...defaultFont,
    textTransform: "uppercase",
    padding: "5px 0",
    display: "block",
    fontSize: "18px",
    textAlign: "center",
    fontWeight: "600",
    lineHeight: "30px",
    textDecoration: "none",
    backgroundColor: "transparent",
    color: "#1A73E8",
    "&:hover": {
      color: "#1A73E8"
    }
  },
  logoLinkRTL: {
    textAlign: "right"
  },
  logoImage: {
    width: "30px",
    display: "inline-block",
    maxHeight: "30px",
    marginLeft: "10px",
    marginRight: "15px"
  },
  img: {
    width: "35px",
    top: "22px",
    position: "absolute",
    verticalAlign: "middle",
    border: "0"
  },
  background: {
    position: "absolute",
    zIndex: "1",
    height: "100%",
    width: "100%",
    display: "block",
    top: "0",
    left: "0",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    "&:after": {
      position: "absolute",
      zIndex: "3",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      background: blackColor,
      opacity: ".8"
    }
  },
  list: {
    marginTop: "20px",
    paddingLeft: "0",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: "0",
    listStyle: "none",
    position: "unset"
  },
  item: {
    position: "relative",
    display: "block",
    textDecoration: "none",
    "&:hover,&:focus,&:visited,&": {
      color: "#1A73E8"
    }
  },
  itemLink: {
    width: "auto",
    transition: "all 300ms linear",
    margin: "10px 15px 0",
    borderRadius: "8px",
    position: "relative",
    display: "block",
    padding: "10px 15px",
    backgroundColor: "transparent",
    ...defaultFont
  },
  itemIcon: {
    width: "24px",
    height: "30px",
    fontSize: "20px",
    lineHeight: "30px",
    float: "left",
    marginRight: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    color: "#5F6368"
  },
  itemIconRTL: {
    marginRight: "3px",
    marginLeft: "15px",
    float: "right"
  },
  itemText: {
    ...defaultFont,
    margin: "0",
    lineHeight: "30px",
    fontSize: "14px",
    color: "#5F6368",
    fontWeight: "500"
  },
  itemTextRTL: {
    textAlign: "right"
  },
  whiteFont: {
    color: "#1A73E8"
  },
  purple: {
    backgroundColor: primaryColor[ 0 ],
    ...primaryBoxShadow,
    "&:hover,&:focus": {
      backgroundColor: primaryColor[ 0 ],
      ...primaryBoxShadow
    }
  },
  blue: {
    backgroundColor: "#E8F0FE",
    "&:hover,&:focus": {
      backgroundColor: "#E8F0FE"
    }
  },
  green: {
    backgroundColor: successColor[ 0 ],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(successColor[ 0 ]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(successColor[ 0 ]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: successColor[ 0 ],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(successColor[ 0 ]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(successColor[ 0 ]) +
        ",.2)"
    }
  },
  orange: {
    backgroundColor: warningColor[ 0 ],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(warningColor[ 0 ]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(warningColor[ 0 ]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: warningColor[ 0 ],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(warningColor[ 0 ]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(warningColor[ 0 ]) +
        ",.2)"
    }
  },
  red: {
    backgroundColor: dangerColor[ 0 ],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(dangerColor[ 0 ]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(dangerColor[ 0 ]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: dangerColor[ 0 ],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(dangerColor[ 0 ]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(dangerColor[ 0 ]) +
        ",.2)"
    }
  },
  sidebarWrapper: {
    position: "relative",
    height: "calc(100vh - 75px)",
    overflow: "auto",
    width: "260px",
    zIndex: "4",
    overflowScrolling: "touch"
  },
  activePro: {
    [ theme.breakpoints.up("md") ]: {
      position: "absolute",
      width: "100%",
      bottom: "13px"
    }
  }
});

export default sidebarStyle;