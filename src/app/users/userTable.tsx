'use client'
import Link from 'next/link'
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, TablePagination } from '@mui/material'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export interface User {
  id: any
  username: string
  email: string
  firstName?: string
  lastName?: string
}
export interface UserTableProperties {
  users: User[]
  totalUsers: number
  count: number
  offset: number
}

export default function UserTable(props: UserTableProperties) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = new URLSearchParams(useSearchParams())

  const handleChangePage = (event: unknown, newPage: number) => {
    const offset = props.count * newPage
    searchParams.set('offset', offset.toString())
    router.push(`${pathname}?${searchParams}`)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event)
    const offset = 0
    const count = event.target.value
    searchParams.set('offset', offset.toString())
    searchParams.set('count', count)
    router.push(`${pathname}?${searchParams}`)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.users.map((user) => (
                <TableRow
                  component={Link}
                  href={`/users/${user.id}/`}
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.username}
                  </TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.firstName}</TableCell>
                  <TableCell align="right">{user.lastName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.totalUsers}
          rowsPerPage={props.count}
          page={props.offset / props.count}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
