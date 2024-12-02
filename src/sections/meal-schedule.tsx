import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { getGuests, QUERY_KEY } from '@/api/guestService';
import { guestsToFoodSchedule } from '@/mappers/guestsToFoodSchedule';

export default function MealSchedule() {
	const {
		data,
		isLoading,
		isError,
	} = useQuery({
		queryKey: [QUERY_KEY],
		queryFn: getGuests,
	});

	const foodSchedule = guestsToFoodSchedule(data);

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
					{isLoading && (
						<TableRow className="col-span-4 animate-pulse">
							<TableCell colSpan={4}>
								<p className="text-center">Loading...</p>
							</TableCell>
						</TableRow>
					)}
					{isError && <p className="text-red-500">Error happened</p>}
					{Object.entries(foodSchedule).map(([date, names]) => (
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
		<ul className="flex flex-col gap-1">
			{names.map((name) => (
				<li key={name}>{name}</li>
			))}
		</ul>
	);
}
