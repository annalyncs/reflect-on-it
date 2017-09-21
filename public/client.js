let REFLECTIONS_URL = '/reflections';
let NEW_REFLECTIONS_URL = '/reflections/new';



function postNewReflection(event) {
    $('#new-reflection').on('submit', function (e) {
        e.preventDefault();
        $.ajax(NEW_REFLECTIONS_URL, {
            type: "POST",
            data: $('#new-reflection').serializeArray();
            success: function (data) {
                let str = $('#new-reflection').serializeArray();
                console.log(str);
                $('#reflections').append(`
                <h2>Date:</h2>
                <p class="reflection-date">${str[0].value}</p>
                <h2>Location:</h2>
                <p class="reflection-location">${str[1].value}</p>
                <h2>Mood:</h2>
                <p class="reflection-mood">${str[2].value}</p>
                <h2>Reflection:</h2>
                <p class="reflection-text">${str[3].value}</p>
                `);
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
                    $('#reflections').append('<p>' + data[index].text + '</p>');
                };
            }
        });
    });
}


$(function () {
    displayReflections();
    postNewReflection();
})
