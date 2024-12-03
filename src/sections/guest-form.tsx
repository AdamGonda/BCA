import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addGuest, QUERY_KEY } from '@/api/guestService';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

export default function GuestForm() {
	const [name, setName] = useState('');
	const [startDate, setStartDate] = useState<Date | undefined>();
	const [endDate, setEndDate] = useState<Date | undefined>();
	const [hasAnyAllergies, setHasAnyAllergies] = useState(false);

	const queryClient = useQueryClient();

	const guests = useMutation({
		mutationFn: addGuest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
			setName('');
			setStartDate(undefined);
			setEndDate(undefined);
			setHasAnyAllergies(false);
		},
	});

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!name || !startDate || !endDate) {
			toast.error('Please fill all fields');
			return;
		}

		guests.mutate({ name, startDate: startDate!, endDate: endDate!, hasAnyAllergies });
	}

	function handleCheckedChange(checked: boolean) {
		setHasAnyAllergies(checked);
	}

	return (
		<div className="mx-auto mt-8 w-full">
			<form className="space-y-6" onSubmit={handleSubmit}>
				<div className="flex flex-wrap gap-4">
					<Input
						type="text"
						placeholder="Guest Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						data-test-id="name-input"
						required
						className="flex-1"
					/>
					<DatePicker
						date={startDate}
						onDateChange={setStartDate}
						placeholder="Start Date"
						className="flex-1"
					/>
					<DatePicker
						date={endDate}
						onDateChange={setEndDate}
						placeholder="End Date"
						className="flex-1"
					/>
					<div className="flex items-center gap-1">
						<Checkbox
							id="allergy"
							checked={hasAnyAllergies}
							onCheckedChange={handleCheckedChange}
						/>
						<label
							htmlFor="allergy"
							className="cursor-pointer select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Has any allergies?
						</label>
					</div>
				</div>
				<div className="flex w-full justify-center">
					<Button
						type="submit"
						data-test-id="submit-button"
						className="w-1/2"
						disabled={guests.isPending}
					>
						Add to Menu
					</Button>
				</div>
			</form>
		</div>
	);
}
