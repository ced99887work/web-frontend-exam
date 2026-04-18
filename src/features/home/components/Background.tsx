import { useCallback, useEffect } from 'react';
import { Box } from '@mui/material';
import { useDevice } from '@/context/DeviceProvider';
import { composeMobileClass } from '@/utils';

const MAX_EYE_X = 3;
const MIN_EYE_X = 10;
const MAX_EYE_Y = 1.5;
const MIN_EYE_Y = 1;
const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const Background = () => {
  const { isMobile } = useDevice();

  const handleBocyMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobile) return;
      const el = document.body;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0~1
      const py = (e.clientY - rect.top) / rect.height; // 0~1
      const nx = clamp((px - 0.5) * 2, -1, 1); // -1~1
      const ny = clamp((py - 0.5) * 2, -1, 1); // -1~1

      // 左右分段位移：左側用 MAX_LEFT_X、右側用 MAX_RIGHT_X
      const dx = nx < 0 ? nx * MIN_EYE_X : nx * MAX_EYE_X;
      // 上下分段位移：上側用 MAX_TOP_Y、下側用 MIN_BOTTOM_Y
      const dy = ny < 0 ? ny * MIN_EYE_Y : ny * MAX_EYE_Y;

      el.style.setProperty('--eye-x', `${dx}px`);
      el.style.setProperty('--eye-y', `${dy}px`);
    },
    [isMobile],
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleBocyMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleBocyMouseMove);
    };
  }, [handleBocyMouseMove]);

  return (
    <Box className={composeMobileClass('home-background', isMobile)}>
      {/* 人物底圖 */}
      <img
        className="home-layer layer-character-white"
        src="/images/home/character-white.png"
        alt="character white"
      />
      {/* 左眼 */}
      <img
        className={composeMobileClass(
          'home-layer layer-character-left-eye-container',
          isMobile,
        )}
        src="/images/home/left-eye-container.png"
        alt="character left eye container"
      />
      {/* 右眼 */}
      <img
        className={composeMobileClass(
          'home-layer layer-character-right-eye-container',
          isMobile,
        )}
        src="/images/home/right-eye-container.png"
        alt="character right eye container"
      />
      {/* 人物主體 */}
      <img
        className="home-layer layer-character-main"
        src="/images/home/character-01.png"
        alt="character"
      />
      {/* logo */}
      <img
        className={composeMobileClass('home-layer layer-logo', isMobile)}
        src={'/images/home/logo-01.png'}
        alt="logo"
      />
    </Box>
  );
};

export default Background;
