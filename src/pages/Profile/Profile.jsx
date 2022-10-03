import React, { useContext } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useStyles } from './Profile.styles';
import {Text} from '@mantine/core'; 
import { AuthContext } from '../../api/auth.api';
import Load from '../../components/Load/Load';

const Profile = () => {
  const auth = useContext(AuthContext);
  const { classes } = useStyles();
  const date = new Date(auth.data.iat).toLocaleDateString();

  if(!auth) return <Load />;

  return (
    <div>
      <Navbar></Navbar>
      <div className={classes.main}>
      <Text className={classes.text}>Profile</Text>
      <Text>Name: {auth.data.user_name}</Text>
      <Text>Email: {auth.data.user_email}</Text>
      <Text>Created On: {date}</Text>
      </div>
    </div>
  )
}

export default Profile