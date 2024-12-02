import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

export default function MealSchedule() {
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
					<TableRow>
						<TableCell data-test-id="date">2023-12-04</TableCell>
						<TableCell>
							<ul data-test-id="breakfast-list">
								<li>Teszt Elek</li>
							</ul>
						</TableCell>
						<TableCell>
							<ul data-test-id="lunch-list">
								<li>Teszt Elek</li>
							</ul>
						</TableCell>
						<TableCell>
							<ul data-test-id="dinner-list">
								<li>Teszt Elek</li>
							</ul>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell data-test-id="date">2023-12-05</TableCell>
						<TableCell>
							<ul data-test-id="breakfast-list">
								<li>Teszt Elek</li>
							</ul>
						</TableCell>
						<TableCell>
							<ul data-test-id="lunch-list">
								<li>Teszt Elek</li>
							</ul>
						</TableCell>
						<TableCell>
							<ul data-test-id="dinner-list">
								<li>Teszt Elek</li>
							</ul>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
