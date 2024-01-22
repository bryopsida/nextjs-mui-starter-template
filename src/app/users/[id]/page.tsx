import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import Paper from '@mui/material/Paper'

export function getPageTitle(): string {
  return 'User - '
}

export default async function UserPage() {
  return (
    <Container>
      <Paper>View/Edit User Page</Paper>
    </Container>
  )
}
