import { Guest } from '@/types/Guest';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const resource = 'guests';
export const QUERY_KEY = 'food-schedule';

export async function getGuests() {
	// simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 1000));

	try {
		const response = await fetch(`${BACKEND_URL}/${resource}`);

		if (!response.ok) {
			console.log('Error fetching guests');
			return [];
		}

    return (await response.json()) as Guest[];
	} catch (error) {
		console.log(error);
		return [];
	}
}

export async function addGuest({ name, startDate, endDate }: Guest) {
	try {
		await fetch(`${BACKEND_URL}/${resource}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				startDate,
				endDate,
			}),
		});
	} catch (error) {
		console.log(error);
	}
}
