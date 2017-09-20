const MOCK_SUBMISSIONS = {
    "submissions": [
        {
            "id": "111111",
            "text": "hello world",
            "mood": "happy",
            "date": "09/17/2017",
            "location": "home",
        },
        {
            "id": "1234456",
            "text": "new entry submission hello",
            "mood": "sad",
            "date": "01/26/2017",
            "location": "work",
        },
        {
            "id": "333333",
            "text": "reflection reflecting new reflection is writtten here",
            "mood": "angry",
            "date": "04/08/2017",
            "location": "school",
        },
        {
            "id": "456789",
            "text": "sample text sample reflection sample sample",
            "mood": "calm",
            "date": "07/07/2017",
            "location": "work",
        },
    ]
}

function getSubmissions(callback) {
    setTimeout(function () {
        callback(MOCK_SUBMISSIONS)
    }, 100);
}

function displaySubmissions(data) {
    for (index in data.submissions) {
        $('body').append(
            '<p>' + data.submissions[index].text + '<p>');
    }
}

function getAndDisplaySubmissions() {
    getSubmissions(displaySubmissions);
}

$(function () {
    getAndDisplaySubmissions();
})
