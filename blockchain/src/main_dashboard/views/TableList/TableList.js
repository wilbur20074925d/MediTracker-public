import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
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
  table: {
    '& .MuiTableHead-root': {
      backgroundColor: '#F8FAFC'
    },
    '& .MuiTableCell-head': {
      color: '#1A73E8',
      fontWeight: '600'
    },
    '& .MuiTableCell-body': {
      color: '#5F6368'
    },
    '& .MuiTableRow-root:hover': {
      backgroundColor: 'rgba(26, 115, 232, 0.04)'
    }
  }
});

export default function TableList() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card className={classes.card}>
          <CardHeader className={classes.cardHeader}>
            <h4 className={classes.cardTitle}>Simple Table</h4>
            <p className={classes.cardCategory}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Country", "City", "Salary"]}
              tableData={[
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                ["Mason Porter", "Chile", "Gloucester", "$78,615"]
              ]}
              className={classes.table}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card className={classes.card}>
          <CardHeader className={classes.cardHeader}>
            <h4 className={classes.cardTitle}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategory}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Country", "City", "Salary"]}
              tableData={[
                ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                [
                  "4",
                  "Philip Chaney",
                  "$38,735",
                  "Korea, South",
                  "Overland Park"
                ],
                [
                  "5",
                  "Doris Greene",
                  "$63,542",
                  "Malawi",
                  "Feldkirchen in Kärnten"
                ],
                ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
              ]}
              className={classes.table}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
