const getDataFromLS = (key: string, returnedValue: string) => {
	if (returnedValue === "number") {
    const data: string | null = localStorage.getItem(key);
		if (data) {
			return parseFloat(JSON.parse(data));
		} else {
			return 0;
		}
	}
	if (returnedValue === "array") {
		const data: string | null = localStorage.getItem(key);
		if (data) {
			return JSON.parse(data);
		} else {
			return [];
		}
	}
	
};

export { getDataFromLS };