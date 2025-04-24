import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxWidth: 800,
    margin: 'auto',
  },
  cardHeader: {
    backgroundColor: '#1976d2', // blue color
    color: '#fff',
    padding: theme.spacing(2),
    borderRadius: '4px 4px 0 0',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(2),
  },
  fullWidth: {
    gridColumn: '1 / -1',
  },
  button: {
    marginTop: theme.spacing(2),
    width: '150px',
  }
}));

export default function UserProfile() {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    company: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    postalCode: '',
    aboutMe: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = () => {
    console.log(formData);
    alert("Profile Updated!");
  };

  return (
    <Card className={classes.root}>
      <div className={classes.cardHeader}>
        <Typography variant="h6">Edit Profile</Typography>
        <Typography variant="body2">Complete your profile</Typography>
      </div>
      <CardContent className={classes.form}>
        <TextField
          label="Company (disabled)"
          name="company"
          value={formData.company}
          onChange={handleChange}
          disabled
        />
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <TextField
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <TextField
          label="Postal Code"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
        />
        <TextField
          label="About Me"
          name="aboutMe"
          value={formData.aboutMe}
          onChange={handleChange}
          multiline
          rows={3}
          className={classes.fullWidth}
        />
        <Button 
          variant="contained" 
          color="primary" 
          className={classes.button}
          onClick={handleSubmit}
        >
          Update Profile
        </Button>
      </CardContent>
    </Card>
  );
}
