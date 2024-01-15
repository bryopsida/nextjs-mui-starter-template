import * as React from 'react'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HomeIcon from '@mui/icons-material/Home'
import UsersIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'

export const metadata = {
  title: 'Next.js MUI Starter Template',
  description: 'Next.js App Router + Material UI v5 Starter Template'
}

const DRAWER_WIDTH = 240

const LINKS = [
  { text: 'Home', href: '/', icon: HomeIcon },
  { text: 'Users', href: '/users', icon: UsersIcon }
]

const BOTTOM_LINKS = [
  { text: 'Settings', href: '/settings', icon: SettingsIcon },
  { text: 'Logout', href: '/logout', icon: LogoutIcon }
]

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar sx={{ backgroundColor: 'background.paper' }}>
              <DashboardIcon
                sx={{ color: '#444', mr: 2, transform: 'translateY(-2px)' }}
              />
              <Typography variant="h6" color="text.primary">
                Next.js App Router
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: DRAWER_WIDTH,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
                top: ['48px', '56px', '64px'],
                height: 'auto',
                bottom: 0
              }
            }}
            variant="permanent"
            anchor="left"
          >
            <Divider />
            <List>
              {LINKS.map(({ text, href, icon: Icon }) => (
                <ListItem key={href} disablePadding>
                  <ListItemButton component={Link} href={href}>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ mt: 'auto' }} />
            <List>
              {BOTTOM_LINKS.map(({ text, href, icon: Icon }) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton component={Link} href={href}>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              ml: `${DRAWER_WIDTH}px`,
              mt: ['48px', '56px', '64px'],
              p: 3
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  )
}
