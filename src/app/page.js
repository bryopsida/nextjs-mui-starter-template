import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Box>
        <Card>
          <Typography variant="h2">Hello World ~</Typography>
        </Card>
      </Box>
    </main>
  )
}
