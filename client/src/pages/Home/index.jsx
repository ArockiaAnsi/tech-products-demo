import { useEffect, useState } from "react";

import { Pagination, ResourceList, FilterResource } from "../../components";
import { useSearchParams } from "../../hooks";
import { ResourceService, useService, TopicService } from "../../services";

export function Home() {
	const resourceService = useService(ResourceService);
	const topicService = useService(TopicService);

	const searchParams = useSearchParams();
	const [{ lastPage, resources } = {}, setEnvelope] = useState();
	const [topics, setTopics] = useState([]);
	const [selectedTopic, setSelectedTopic] = useState("");

	const handleFilterChange = (topic) => {
		setSelectedTopic(topic);
	};

	useEffect(() => {
		const updatedSearchParams = {
			...searchParams,
			topic: selectedTopic || undefined,
		};
		resourceService.getPublished(updatedSearchParams).then(setEnvelope);
	}, [resourceService, searchParams, selectedTopic]);

	useEffect(() => {
		topicService.getTopics().then((fetchedTopics) => {
			setTopics(fetchedTopics);
		});
	}, [topicService]);

	const filteredResources = resources?.filter((resource) =>
		selectedTopic ? resource.topic_name === selectedTopic : true
	);

	return (
		<section>
			<FilterResource
				topics={topics ?? []}
				selectedTopic={selectedTopic}
				onFilterChange={handleFilterChange}
			/>
			<ResourceList resources={filteredResources ?? []} />
			<Pagination lastPage={lastPage ?? 1} />
		</section>
	);
}

export default Home;
