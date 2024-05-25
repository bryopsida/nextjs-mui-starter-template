import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import Paper from '@mui/material/Paper'
import userService from '@/services/user'

let title = `User -`

export default async function UserPage({ params }: { params: { id: number } }) {
  const user = await userService.getById(params.id)
  return (
    <Container>
      <Paper>View/Edit User Page</Paper>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Container>
  )
}

export function getPageTitle(): string {
  return title
}
