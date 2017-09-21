var REFLECTIONS_URL = '/reflections';
var NEW_REFLECTIONS_URL = '/reflections/new';

function postNewReflection(event) {
    $('#new-reflection').on('submit', function (e) {
        e.preventDefault();
        $.ajax(NEW_REFLECTIONS_URL, {
            type: "POST",
            data: $(this).serialize(),
            success: function () {
                console.log('posting data');
            }
        });
    });
}

function displayReflections() {
    $('#view-button').click(() => {
        $.ajax(REFLECTIONS_URL, {
            type: 'GET',
            success: function (data) {
                console.log(data);
                for (index in data) {
                    $('#reflection-text').append('<p>' + data[index].text + '</p>');
                };
            }
        });
    });
}



//const MOCK_REFLECTIONS = {
//    "reflections": [
//        {
//            "id": "111111",
//            "text": "hello world",
//            "mood": "happy",
//            "date": "09/17/2017",
//            "location": "home",
//        },
//        {
//            "id": "1234456",
//            "text": "new entry submission hello",
//            "mood": "sad",
//            "date": "01/26/2017",
//            "location": "work",
//        },
//        {
//            "id": "333333",
//            "text": "reflection reflecting new reflection is writtten here",
//            "mood": "angry",
//            "date": "04/08/2017",
//            "location": "school",
//        },
//        {
//            "id": "456789",
//            "text": "sample text sample reflection sample sample",
//            "mood": "calm",
//            "date": "07/07/2017",
//            "location": "work",
//        },
//    ]
//}
//
//function getReflections(callback) {
//    setTimeout(function () {
//        callback(MOCK_REFLECTIONS)
//    }, 100);
//}
//
//function displayReflections(data) {
//    for (index in data.reflections) {
//        $('body').append(
//            '<p>' + data.reflections[index].text + '<p>');
//    }
//}
//
//function getAndDisplayReflections() {
//    getReflections(displayReflections);
//}
//
$(function () {
    displayReflections();
    postNewReflection();
})
