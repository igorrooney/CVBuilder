import Navbar from '@/components/UI/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
