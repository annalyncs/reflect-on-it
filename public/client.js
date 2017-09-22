let REFLECTIONS_URL = '/reflections';
let NEW_REFLECTIONS_URL = '/reflections/new';


//post a new reflection
function postNewReflection() {
    $('#new-reflection').on('submit', function (e) {
        e.preventDefault();
        var dateInput = $(this).parent().find('#date').val();
        var locationInput = $(this).parent().find('#location').val();
        var moodInput = $(this).parent().find('#mood').val();
        var textInput = $(this).parent().find('#text').val();

        var dataInput = {
            'date': dateInput,
            'location': locationInput,
            'mood': moodInput,
            'text': textInput,
        };

        console.log(dataInput);

        let htmlOutput = "";
        $.ajax({
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(dataInput),
                url: NEW_REFLECTIONS_URL,
            })
            .done(function (data) {
                console.log(data);

                htmlOutput += '<div class="current-reflection">';
                htmlOutput += '<h2>Date:</h2>';
                htmlOutput += '<p class="reflection-date">';
                htmlOutput += data.date;
                htmlOutput += '</p>';
                htmlOutput += '<h2>Location:</h2>';
                htmlOutput += '<p class="reflection-location">';
                htmlOutput += data.location;
                htmlOutput += '</p>';
                htmlOutput += '<h2>Mood:</h2>';
                htmlOutput += '<p class="reflection-mood">';
                htmlOutput += data.mood;
                htmlOutput += '</p>';
                htmlOutput += '<h2>Reflection:</h2>';
                htmlOutput += '<p class="reflection-text">';
                htmlOutput += data.text;
                htmlOutput += '</p>';
                htmlOutput += '</div>';

                $('#reflections').append(htmlOutput);
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                $('reflections').append('No entry submitted');
            });
    });
}


//display all reflections
function displayReflections() {
    $.ajax({
        type: 'GET',
        url: REFLECTIONS_URL,
        success: function (data) {
            console.log(data);
            if (data.length === 0) {
                $('#reflections').append('No reflections found!');
            }
            for (index in data) {
                $('#reflections').append(
                    `<div id="entries">
                            <input type="hidden" class="reflectionID" value="${data[index]._id}">
                            <p>${data[index].date}</p>
                            <p>${data[index].location}<p>
                            <button id="edit-button" class="reflections-button">Edit</butto>
                            <button id="delete-button" class="reflections-button">Delete</button>
                            <button id="current-button" class="reflections-button">View</button>
                        </div>`
                );
            };
        },
        failure: function () {
            $('reflections').append('No reflections found');
        }
    });
}

//delete selected reflection

function deleteReflection() {
    let idParameter = $('#entries').find('.reflectionID').val();
    console.log(idParameter);
    $.ajax({
        type: 'DELETE',
        url: REFLECTIONS_URL + '/' + idParameter,
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            console.log('deleting reflection');
            displayReflections();
        }
    })
};


function handleDisplayReflections() {
    $('#view-button').click(() => {
        displayReflections();
        $('.main-buttons').addClass('hide-display');
        $('.current-reflection').addClass('hide-display');
    });
}

function handleDeleteReflections() {
    $('#reflections').on('click', '#delete-button', function () {
        deleteReflection();
    });
}

$(function () {
    postNewReflection();
    handle deleteReflection();
    handleDisplayReflections();
    //    updateReflections();
})
