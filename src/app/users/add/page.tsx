import AddUserForm from './addUserForm'
import { Container } from '@mui/material'

export default async function AddUserPage() {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <AddUserForm></AddUserForm>
    </Container>
  )
}
