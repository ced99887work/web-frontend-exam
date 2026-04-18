import { createFileRoute } from '@tanstack/react-router';
import { Box } from '@mui/material';
import { HomeProvider } from '@/features/home/context/HomeProvider';
import Background from '@/features/home/components/Background';
import Content from '@/features/home/components/Content';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <HomeProvider>
      <Box className="home-page">
        <Box className="home-background-wrap">
          {/* 背景 */}
          <Background />
        </Box>

        {/* 內容 */}
        <Box className="home-content-wrap">
          <Content />
        </Box>
      </Box>
    </HomeProvider>
  );
}
