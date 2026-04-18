import { createFileRoute } from '@tanstack/react-router';
import { Box } from '@mui/material';
import { HomeProvider } from '@/features/home/context/HomeProvider';
import Background from '@/features/home/components/Background';
import Content from '@/features/home/components/Content';
import { useDevice } from '@/context/DeviceProvider';
import { composeMobileClass } from '@/utils';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const { isMobile } = useDevice();

  return (
    <HomeProvider>
      <Box className="home-page">
        <Box className="home-background-wrap">
          {/* 背景 */}
          <Background />
        </Box>

        {/* 內容 */}
        <Box className={composeMobileClass('home-content-wrap', isMobile)}>
          <Content />
        </Box>
      </Box>
    </HomeProvider>
  );
}
