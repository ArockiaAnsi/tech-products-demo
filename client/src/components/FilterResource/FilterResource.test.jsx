import { render, screen, within } from "@testing-library/react";

// import userEvent from "@testing-library/user-event";
import FilterResource from "./index";

describe("FilterResource", () => {
	// const topics = [
	// 	{ id: 1, topic_name: "React" }, { id: 2, topic_name: "Git" }, { id: 3, topic_name: "HTML/CSS" }];

	it("renders correctly when no topics are provided", () => {
		render(<FilterResource topics={[]} topic="" onFilterChange={() => {}} />);

		const select = screen.getByRole("combobox");
		const options = within(select).getAllByRole("option");
		expect(options).toHaveLength(1); // Only "All Topics" should be available
	});
});
