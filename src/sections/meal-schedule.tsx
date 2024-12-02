import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { eachDayOfInterval, format } from 'date-fns';
import { Guest } from '@/types/Guest';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function MealSchedule() {
	const [foodSchedule, setFoodSchedule] = useState<Record<string, string[]>>({});

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(backendUrl + '/guests');
			const data = await response.json();
			setFoodSchedule(getFoodSchedule(data));
		}

		try {
			fetchData();
		} catch (error) {
			console.error(error);
		}
	}, []);

	function getFoodSchedule(guests: Guest[]) {
		const map: Record<string, string[]> = {};

		guests.forEach((guest) => {
			const { name, startDate, endDate } = guest;

			const dates = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });

			dates.forEach((date) => {
				const formattedDate = format(date, 'yyyy-MM-dd');

				if (!map[formattedDate]) {
					map[formattedDate] = [];
				}
				map[formattedDate].push(name);
			});
		});

		return map;
	}

	const showSchedule = Object.keys(foodSchedule).length > 0;

	return (
		<div className="mx-auto mt-10 w-full overflow-hidden rounded-lg border border-gray-200 shadow-lg">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="font-bold">Date</TableHead>
						<TableHead className="font-bold">Breakfast</TableHead>
						<TableHead className="font-bold">Lunch</TableHead>
						<TableHead className="font-bold">Dinner</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{showSchedule &&
						Object.entries(foodSchedule).map(([date, names]) => (
							<Day key={date} date={date} names={names} />
						))}
				</TableBody>
			</Table>
		</div>
	);
}

function Day({ date, names }: { date: string; names: string[] }) {
	return (
		<TableRow>
			<TableCell data-test-id="date">{date}</TableCell>
			<TableCell>
				<ul data-test-id="breakfast-list">
					<Names names={names} />
				</ul>
			</TableCell>
			<TableCell>
				<ul data-test-id="lunch-list">
					<Names names={names} />
				</ul>
			</TableCell>
			<TableCell>
				<ul data-test-id="dinner-list">
					<Names names={names} />
				</ul>
			</TableCell>
		</TableRow>
	);
}

function Names({ names }: { names: string[] }) {
	return (
		<ul>
			{names.map((name) => (
				<li key={name}>{name}</li>
			))}
		</ul>
	);
}
