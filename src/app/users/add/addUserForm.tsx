'use client'

import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Container,
  Button
} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { addUser } from './clientFunctions'
import { FormError } from '@/errors/FormError'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddUserForm() {
  const router = useRouter()
  const [usernameError, setUsernameError] = useState(false)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')

  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState('')

  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  const [firstNameError, setFirstNameError] = useState(false)
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('')

  const [lastNameError, setLastNameError] = useState(false)
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('')

  const resetErrorState = () => {
    setConfirmPasswordError(false)
    setEmailError(false)
    setUsernameError(false)
    setPasswordError(false)
    setFirstNameError(false)
    setLastNameError(false)

    setFirstNameErrorMessage('')
    setLastNameErrorMessage('')
    setConfirmPasswordErrorMessage('')
    setPasswordErrorMessage('')
    setEmailErrorMessage('')
    setUsernameErrorMessage('')
  }

  const onSubmitHandler = async (evt: any) => {
    try {
      resetErrorState()
      await addUser(evt)
      router.push('/users')
    } catch (err) {
      if (err instanceof FormError) {
        err?.issues?.forEach((i) => {
          i.path.forEach((p) => {
            switch (p) {
              case 'lastName':
                setLastNameError(true)
                setLastNameErrorMessage(i.message)
                break
              case 'firstName':
                setFirstNameError(true)
                setFirstNameErrorMessage(i.message)
                break
              case 'username':
                setUsernameError(true)
                setUsernameErrorMessage(i.message)
                break
              case 'password':
                setPasswordError(true)
                setPasswordErrorMessage(i.message)
                break
              case 'confirmPassword':
                setConfirmPasswordError(true)
                setConfirmPasswordErrorMessage(i.message)
                break
              case 'email':
                setEmailError(true)
                setEmailErrorMessage(i.message)
                break
            }
          })
        })
      }
    }
  }

  return (
    <Container>
      <Paper sx={{ padding: '30px' }}>
        <form onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <TextField
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                error={usernameError}
                helperText={usernameErrorMessage}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                id="first-name"
                name="firstName"
                label="First Name"
                variant="outlined"
                error={firstNameError}
                helperText={firstNameErrorMessage}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                id="last-name"
                name="lastName"
                label="Last Name"
                variant="outlined"
                error={lastNameError}
                helperText={lastNameErrorMessage}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                id="confirm-password"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                error={confirmPasswordError}
                helperText={confirmPasswordErrorMessage}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormControl fullWidth>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="ole-label"
                  id="role"
                  name="role"
                  value="admin"
                  label="Role"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<PersonAddIcon />}
                fullWidth
              >
                Add User
              </Button>
            </Grid>
          </Grid>
        </form>
        <br />
      </Paper>
    </Container>
  )
}
