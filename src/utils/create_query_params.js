const create_query_params = (filters) => {
	let query_params = '';

	Object.keys(filters).forEach((f) => {
		query_params = query_params + `${f}=${filters[f]}&`;
	})

	return query_params;
}

export default create_query_params; 
