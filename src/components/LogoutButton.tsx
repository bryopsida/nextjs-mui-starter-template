'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { ListItemIcon, ListItemButton, ListItemText } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

export function LogoutButton() {
  return (
    <ListItemButton component={Link} href="#" onClick={() => signOut()}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  )
}
