/* eslint-disable global-require */

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.html'],
  media: false,
  theme: {
    extend: {
      fontSize: {
        lg: [
          '1.125rem', {
            lineHeight: '32px',
          }],
      },
      screens: {
        xxs: '390px',
        xs: '480px',
      },
      colors: {
        brand: {
          DEFAULT: '#DC001C',
        },
        orange: {
          DEFAULT: '#EA5532',
        },
        'gray-900': '#222', // text base color
        'gray-800': '#777',
        'gray-100': '#eee', // border base color
        brown: {
          500: '#6D6358',
        },
      },
      spacing: {
        15: '60px',
      },
      borderColor: {
        DEFAULT: '#eee',
      },
      boxShadow: {
        inset: 'inset 0px 2px 2px rgba(0, 0, 0, 0.12)',
        box: '0px 0px 6px rgba(0, 0, 0, 0.08)',
        'red-ring': '0px 5px 15px rgb(191 30 46 / 35%)',
        'gray-ring': '0px 4px 12px rgb(119 119 119 / 12%)',
        'orange-ring': '0px 4px 12px rgb(234 85 50 / 12%)',
      },
      container: {
        center: true,
        screens: {
          '2xl': '1280px',
        },
        padding: {
          DEFAULT: '24px',
          sm: '24px',
          '2xl': '0',
        },
      },
    },
  },
  variants: {
    extend: {},
  },

  plugins: [require('@tailwindcss/line-clamp')],
};
