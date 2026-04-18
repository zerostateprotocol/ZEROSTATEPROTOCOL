/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:         '#0d0416',
          bgCard:     '#110822',
          bgDeep:     '#080210',
          bgHover:    '#1a0a2e',
          border:     '#2d1650',
          borderDim:  '#1a0a2e',
          purple:     '#a855f7',
          purpleLight:'#c084fc',
          purpleDim:  '#7c3aed',
          purpleMuted:'#6b5490',
          textPrimary:'#e9d5ff',
          textMuted:  '#8b7aa8',
          textDim:    '#6b5490',
          textFaint:  '#4a3566',
          green:      '#22c55e',
          yellow:     '#eab308',
          red:        '#f43f5e',
        }
      },
      fontFamily: {
        mono:    ['"IBM Plex Mono"', 'monospace'],
        space:   ['"Space Mono"', 'monospace'],
        pixel:   ['"Press Start 2P"', 'monospace'],
        vhs:     ['"VT323"', 'monospace'],
      },
      animation: {
        scanline: 'scanline 4s linear infinite',
        blink:    'blink 1s step-end infinite',
        glitch:   'glitch 0.3s ease',
        float:    'float 3s ease-in-out infinite',
        marquee:  'marquee 20s linear infinite',
      },
      keyframes: {
        scanline: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100vh)' } },
        blink:    { '0%, 50%': { opacity: '1' }, '51%, 100%': { opacity: '0' } },
        glitch:   { '0%,100%': { transform: 'translate(0)' }, '20%': { transform: 'translate(-2px,2px)' }, '40%': { transform: 'translate(-2px,-2px)' }, '60%': { transform: 'translate(2px,2px)' }, '80%': { transform: 'translate(2px,-2px)' } },
        float:    { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        marquee:  { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
