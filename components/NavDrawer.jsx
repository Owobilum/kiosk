import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';

import categories from '../utils/categories';
import { signOutUser } from '../redux/actions/auth';

export default function NavDrawer({ isOpen, toggleDrawer }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSignOut = () => dispatch(signOutUser());

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {categories &&
          categories.map((category) => (
            <ListItem
              button
              key={category.name}
              onClick={() => router.push(`/categories/${category.path}`)}
            >
              <ListItemIcon>
                <Image src={category.icon} alt="" height="16px" width="16px" />
              </ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
      </List>
      <Divider />
      <Typography variant="caption" component="p" sx={{ paddingLeft: '16px' }}>
        {user?.displayName ? `Signed in as ${user.displayName}` : ''}
      </Typography>
      <Divider />
      <List>
        {!user && (
          <ListItem button onClick={() => router.push('/signin')}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Sign in" />
          </ListItem>
        )}
        {user && (
          <ListItem button onClick={handleSignOut}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
}
