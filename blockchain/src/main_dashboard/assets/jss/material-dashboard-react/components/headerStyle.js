import {
  container,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor
} from '../../material-dashboard-react.js';

const headerStyle = () => ({
  appBar: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.05)",
    borderBottom: "0",
    marginBottom: "0",
    position: "absolute",
    width: "100%",
    paddingTop: "10px",
    zIndex: "1029",
    color: "#1A73E8",
    border: "0",
    borderRadius: "3px",
    padding: "10px 0",
    transition: "all 150ms ease 0s",
    minHeight: "50px",
    display: "block"
  },
  container: {
    ...container,
    minHeight: "50px"
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    letterSpacing: "unset",
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "#1A73E8",
    margin: "0",
    "&:hover,&:focus": {
      background: "transparent"
    }
  },
  appResponsive: {
    top: "8px"
  },
  primary: {
    backgroundColor: "#1A73E8",
    color: whiteColor,
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: "#1A73E8",
    color: whiteColor,
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: "#1A73E8",
    color: whiteColor,
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: "#1A73E8",
    color: whiteColor,
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: "#1A73E8",
    color: whiteColor,
    ...defaultBoxShadow
  }
});

export default headerStyle;