document.getElementById('horoscopeForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevents page reload

    const sign = document.getElementById('sign').value.trim().toLowerCase();
    const period = document.getElementById('period').value;
    const language = 'en';  // Hardcoded to English

    // Check if sign input is valid
    if (!sign) {
        document.getElementById('horoscopeText').innerText = 'Please enter a valid zodiac sign.';
        return;
    }

    // Initialize XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    // Handle response
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            try {
                const response = JSON.parse(xhr.responseText);

                // Logging response to see if it's received correctly
                console.log('API Response:', response);

                // Check if 'general' array exists and has at least one item
                if (response.general && response.general.length > 0) {
                    document.getElementById('horoscopeText').innerText = response.general[0];
                } else {
                    document.getElementById('horoscopeText').innerText = 'No horoscope data found.';
                    console.error('Error: No horoscope data found in the response', response);
                }
            } catch (e) {
                document.getElementById('horoscopeText').innerText = 'Error processing the response.';
                console.error('Error parsing response:', xhr.responseText);
            }
        }
    };

    // Build the API URL with user inputs
    const url = `https://horoscopes-ai.p.rapidapi.com/get_horoscope/${sign}/${period}/general/${language}`;
    xhr.open('GET', url);

    // Set required headers
    xhr.setRequestHeader('x-rapidapi-key', '2161ab2fbbmshf7e7f051a33234dp118912jsneb9b1d1a40ca');
    xhr.setRequestHeader('x-rapidapi-host', 'horoscopes-ai.p.rapidapi.com');

    // Send the request
    xhr.send(null);
});

