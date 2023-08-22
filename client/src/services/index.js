import { useMemo } from "react";

import { useAuthenticatedFetch } from "../authContext";

import ResourceService from "./resourceService";
import TopicService from "./topicService";

/**
 * Inject the authenticated fetch wrapper into the specified service.
 * @template T
 * @param {{new (fetcher: typeof fetch): T}} Service
 * @returns {T}
 */
export function useService(Service) {
	const authenticatedFetch = useAuthenticatedFetch();
	return useMemo(() => {
		return new Service(authenticatedFetch);
	}, [authenticatedFetch, Service]);
}

export function useResourceService() {
	const authenticatedFetch = useAuthenticatedFetch();
	return useMemo(
		() => new ResourceService(authenticatedFetch),
		[authenticatedFetch]
	);
}

export function useTopicService() {
	const authenticatedFetch = useAuthenticatedFetch();
	return useMemo(
		() => new TopicService(authenticatedFetch),
		[authenticatedFetch]
	);
}