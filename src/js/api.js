const apiFetchGET = async (url) => {
    try {
        let response = await fetch(url);
        response = await response.json();
        return response;
    } catch (e) {
        console.log(e);
    }
}

const apiFetchPOST = async (url, body) => {
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        response = await response.json();
        return response;
    } catch (e) {
        console.log(e);
    }
}