import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#0056b3', // Tailwind primary color
		},
		secondary: {
			main: '#495057', // Tailwind secondary color
		},
		background: {
			default: '#f8f9fa', // Tailwind background
			paper: '#ffffff',
		},
		text: {
			primary: '#212529',
			secondary: '#6c757d',
		},
	},
	typography: {
		fontFamily: "'Inter', sans-serif",
		h1: { fontSize: '2rem', fontWeight: 700 },
		h2: { fontSize: '1.75rem', fontWeight: 600 },
		h3: { fontSize: '1.5rem', fontWeight: 500 },
		body1: { fontSize: '1rem' },
		body2: { fontSize: '0.875rem' },
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: '8px', // Match Tailwind rounded-md
					textTransform: 'none',
					padding: '10px 16px',
					fontSize: '1rem',
					fontWeight: '600',
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: '16px',
					boxShadow: '0px 4px 6px rgba(0,0,0,0.1)', // Tailwind shadow-md
				},
			},
		},
	},
});

export default theme;
