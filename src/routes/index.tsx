import { createFileRoute } from '@tanstack/react-router';
import { Box } from '@mui/material';
// import backgroundImage from '../../public/images/background.png';
import Background from '@/components/home/Background';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <Box className="home-page">
      {/* 背景 */}
      <Background />

      {/* 內容 */}
    </Box>
  );
}
