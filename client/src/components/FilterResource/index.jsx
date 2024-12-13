import PropTypes from "prop-types";
import { useState } from "react";

import "./FilterResource.scss";

export default function FilterResource({ topics, topic, onFilterChange }) {
	const [filterTopic, setFilterTopic] = useState(topic);

	const handleFilterChange = (event) => {
		const newTopic = event.target.value;
		setFilterTopic(newTopic);
		onFilterChange(newTopic);
	};

	return (
		<div className="filter-resource">
			<label htmlFor="topicFilter">Filter by Topic:</label>
			<select
				id="topicFilter"
				value={filterTopic}
				onChange={handleFilterChange}
			>
				<option value="">All Topics</option>
				{topics.map(({ id, name }) => (
					<option key={id} value={name}>
						{name}
					</option>
				))}
			</select>
		</div>
	);
}

FilterResource.propTypes = {
	topics: PropTypes.arrayOf(PropTypes.string).isRequired,
	topic: PropTypes.string,
	onFilterChange: PropTypes.func.isRequired,
};
