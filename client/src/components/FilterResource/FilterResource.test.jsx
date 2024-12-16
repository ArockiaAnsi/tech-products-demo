import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FilterResource from "./index";

const topics = [
	{ id: 1, name: "React" },
	{ id: 2, name: "Git" },
	{ id: 3, name: "HTML/CSS" },
];

describe("FilterResource", () => {
	it("renders correctly when no topics are provided", () => {
		render(<FilterResource topics={[]} topic="" onFilterChange={() => {}} />);

		const select = screen.getByRole("combobox");
		const options = within(select).getAllByRole("option");
		expect(options).toHaveLength(1);
	});

	it("calls onFilterChange when a topic is selected", async () => {
		const mockOnFilterChange = vi.fn();
		const user = userEvent.setup();

		render(
			<FilterResource
				topics={topics}
				topic=""
				onFilterChange={mockOnFilterChange}
			/>
		);

		const select = screen.getByRole("combobox");
		await user.selectOptions(select, "Git");

		expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
		expect(mockOnFilterChange).toHaveBeenCalledWith("Git");
	});
});
