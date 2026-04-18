import '@mui/material/Button';
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    gray100: Palette['primary'];
    gray700: Palette['primary'];
  }

  interface PaletteOptions {
    gray100?: PaletteOptions['primary'];
    gray700?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    gray100: true;
    gray700: true;
  }
}

export {};
