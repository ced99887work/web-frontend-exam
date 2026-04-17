import { createFileRoute } from '@tanstack/react-router';
import { Box } from '@mui/material';
// import backgroundImage from '../../public/images/background.png';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <Box>
      Home
    </Box>
  );
}
