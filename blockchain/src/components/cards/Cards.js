import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, Button, CardActions } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    maxWidth: 1200,
    margin: '0 auto',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundColor: '#F8FAFC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    color: '#1A73E8',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: '#1A73E8',
  },
  description: {
    color: '#64748B',
    marginBottom: theme.spacing(3),
    fontSize: '16px',
    lineHeight: 1.6,
  },
  button: {
    backgroundColor: '#1A73E8',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#1557B0',
    },
  },
  cardActions: {
    padding: theme.spacing(3),
    paddingTop: 0,
  },
}));

const RoleCard = ({ title, icon, description, link }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.media}>
        {icon}
      </div>
      <CardContent className={classes.content}>
        <Typography className={classes.title} variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.description} variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          component={NavLink}
          to={link}
          className={classes.button}
          fullWidth
        >
          Get Started
        </Button>
      </CardActions>
    </Card>
  );
};

const Cards = () => {
  const classes = useStyles();

  const roles = [
    {
      title: 'Owner',
      icon: '👑',
      description: 'Manage the entire supply chain and oversee operations',
      link: '/owner'
    },
    {
      title: 'Supplier',
      icon: '📦',
      description: 'Supply raw materials and manage inventory',
      link: '/supplier'
    },
    {
      title: 'Manufacturer',
      icon: '🏭',
      description: 'Produce medicines and manage production',
      link: '/manufacturer'
    },
    {
      title: 'Distributor',
      icon: '🚚',
      description: 'Distribute medicines to wholesalers',
      link: '/distributor'
    },
    {
      title: 'Wholesaler',
      icon: '🏪',
      description: 'Manage wholesale distribution',
      link: '/wholesaler'
    },
    {
      title: 'Transporter',
      icon: '🚛',
      description: 'Handle transportation of goods',
      link: '/transporter'
    }
  ];

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {roles.map((role, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <RoleCard {...role} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Cards;