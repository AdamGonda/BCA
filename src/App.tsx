import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner"

import GuestForm from './sections/guest-form';
import MealSchedule from './sections/meal-schedule';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="min-h-screen bg-gray-50">
				<div className="container mx-auto max-w-5xl px-4 py-12">
					<GuestForm />
					<MealSchedule />
				</div>
			</div>
			<Toaster richColors position="top-center" />
		</QueryClientProvider>
	);
}

export default App;
