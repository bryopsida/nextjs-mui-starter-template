import * as React from 'react'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import UserTable from './userTable'
import { UserService } from '@/services/user'
import Link from 'next/link'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const usersService = new UserService()

export default async function UsersPage({
  searchParams
}: {
  readonly searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const offset = (searchParams?.offset as string) ?? '0'
  const count = (searchParams?.count as string) ?? '10'
  const users = await usersService.getUserPage(
    parseInt(offset),
    parseInt(count)
  )
  return (
    <Container>
      <UserTable
        users={users.data}
        count={users.count}
        offset={users.offset}
        totalUsers={users.totalRows}
      />
      <Button
        component={Link}
        href="/users/add"
        startIcon={<PersonAddIcon />}
        variant="contained"
      >
        Add User
      </Button>
    </Container>
  )
}
