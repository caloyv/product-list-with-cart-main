async function getData() {
    const path = "data.json"
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch(error) {
        console.error(error.message);
    }
}

export default getData;