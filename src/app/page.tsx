import { UsersForm } from '@/components/UsersForm'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" fontWeight={600} component="h1" sx={{ mb: 2 }}>
          Formulário de Pessoas
        </Typography>

        <UsersForm />
      </Box>
    </Container>
  )
}
