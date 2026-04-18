import { createContext, useContext, type ReactNode } from 'react';
import { useMediaQuery } from '@mui/material';
import { type Breakpoint, useTheme } from '@mui/material/styles';

type DeviceContextValue = {
  isMobile: boolean;
};

const DeviceContext = createContext<DeviceContextValue | null>(null);

type DeviceProviderProps = {
  children: ReactNode;
  /**
   * 移動裝置斷點
   * @default 'sm'
   * @description 移動裝置斷點，預設為 'sm'，即小於 48em 的裝置為移動裝置
   */
  mobileBreakpoint?: Breakpoint;
};

export function DeviceProvider({
  children,
  mobileBreakpoint = 'sm',
}: DeviceProviderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(mobileBreakpoint));

  return (
    <DeviceContext.Provider value={{ isMobile }}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice() {
  const context = useContext(DeviceContext);

  if (!context) {
    throw new Error('useDevice must be used within DeviceProvider');
  }

  return context;
}
