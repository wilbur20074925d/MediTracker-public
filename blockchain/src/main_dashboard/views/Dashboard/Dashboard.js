import React from "react";
import { useMemo } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Tasks from "../../components/Tasks/Tasks.js";
import CustomTabs from "../../components/CustomTabs/CustomTabs.js";
import Danger from "../../components/Typography/Danger.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";


import { bugs, website, server } from "../../variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.js";

const useStyles = makeStyles({
  root: {
    padding: '24px',
  },
  card: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.05)",
    borderRadius: "12px",
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    backgroundColor: "#1A73E8",
    color: "#FFFFFF",
    padding: "20px",
    borderRadius: "12px 12px 0 0",
  },
  cardTitle: {
    color: "#1A73E8",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "600",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    fontSize: "1.25rem",
  },
  cardCategory: {
    color: "#5F6368",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardIcon: {
    color: "#FFFFFF",
    marginRight: "10px",
    fontSize: "2rem",
  },
  stats: {
    color: "#1A73E8",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    "& svg": {
      marginRight: "5px",
      fontSize: "1rem",
    }
  },
  chartContainer: {
    position: 'relative',
    height: '300px',
    padding: '20px',
    backgroundColor: '#FFFFFF',
  },
  chart: {
    height: '100%',
    '& .ct-series-a .ct-line, .ct-series-a .ct-point': {
      stroke: '#1A73E8'
    },
    '& .ct-series-a .ct-bar': {
      stroke: '#1A73E8'
    },
    '& .ct-series-a .ct-area': {
      fill: 'rgba(26, 115, 232, 0.1)'
    },
    '& .ct-label': {
      color: '#5F6368',
      fontSize: '12px',
    },
    '& .ct-grid': {
      stroke: 'rgba(0, 0, 0, 0.1)',
      strokeWidth: 1,
      strokeDasharray: '2px',
    }
  },
  cardBody: {
    padding: '20px',
    flexGrow: 1,
  },
  cardFooter: {
    padding: '20px',
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  },
  gridContainer: {
    marginBottom: '24px',
  }
});

export default function Dashboard() {
  const classes = useStyles();
  const randomMinutesAgo = useMemo(() => Math.floor(Math.random() * 30) + 1, []);

  return (
    <div className={classes.root}>
      <GridContainer className={classes.gridContainer}>
        <GridItem xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} stats icon>
              <CardIcon className={classes.cardIcon}>
                <Icon>storage</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter className={classes.cardFooter} stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} stats icon>
              <CardIcon className={classes.cardIcon}>
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter className={classes.cardFooter} stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} stats icon>
              <CardIcon className={classes.cardIcon}>
                <Icon>bug_report</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter className={classes.cardFooter} stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} stats icon>
              <CardIcon className={classes.cardIcon}>
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter className={classes.cardFooter} stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer className={classes.gridContainer}>
        <GridItem xs={12} sm={12} md={4}>
          <Card className={classes.card}>
            <div className={classes.chartContainer}>
              <ChartistGraph
                className={`ct-chart ${classes.chart}`}
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </div>
            <CardBody className={classes.cardBody}>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.stats}>
                  <ArrowUpward /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter className={classes.cardFooter} chart>
              <div className={classes.stats}>
                <AccessTime /> updated {randomMinutesAgo} minute{randomMinutesAgo > 1 ? "s" : ""} ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card className={classes.card}>
            <div className={classes.chartContainer}>
              <ChartistGraph
                className={`ct-chart ${classes.chart}`}
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </div>
            <CardBody className={classes.cardBody}>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter className={classes.cardFooter} chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card className={classes.card}>
            <div className={classes.chartContainer}>
              <ChartistGraph
                className={`ct-chart ${classes.chart}`}
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </div>
            <CardBody className={classes.cardBody}>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter className={classes.cardFooter} chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              }
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader}>
              <h4 className={classes.cardTitle}>Employees Stats</h4>
              <p className={classes.cardCategory}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
