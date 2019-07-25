export function fetchCat() {
    return fetch(
        'https://api.thecatapi.com/v1/images/search?mime_types=gif&size=med',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '2aae974e-1039-408d-aff1-d839557f017a',
            },
        }
    ).then(response => response.json())
}
