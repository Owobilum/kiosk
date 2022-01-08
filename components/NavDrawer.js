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
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';


import categories from '../utils/categories'

export default function NavDrawer({ isOpen, toggleDrawer }) {
    const router = useRouter()
    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {categories && categories.map(category => (
                    <ListItem
                        button
                        key={category.name}
                        onClick={() => router.push(`/categories/${category.path}`)}
                    >
                        <ListItemIcon>
                            <Image
                                src={category.icon}
                                alt=""
                                height="16px"
                                width="16px"
                            />
                        </ListItemIcon>
                        <ListItemText primary={category.name} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary={"Sign in"} />
                </ListItem>
            </List>
            {/* <List>
                {['', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}
        </Box>
    );

    return (
        <>
            <Drawer
                anchor={'left'}
                open={isOpen}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </>
    );
}
