let REFLECTIONS_URL = '/reflections';
let NEW_REFLECTIONS_URL = '/reflections/new';


//post a new reflection
function postNewReflection() {
    $('#new-reflection').on('submit', function (e) {
        e.preventDefault();
        let dateInput = $(this).parent().find('#date').val();
        let locationInput = $(this).parent().find('#location').val();
        let moodInput = $(this).parent().find('#mood').val();
        let textInput = $(this).parent().find('#text').val();

        let dataInput = {
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
            success: function (data) {
                console.log(data);

                htmlOutput += '<div class="current-reflection">';
                htmlOutput += '<input type="hidden" class="reflectionID" value="';
                htmlOutput += data._id;
                htmlOutput += '">';
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

                $('#reflections').html(htmlOutput);
            },
            failure: function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                $('reflections').html('No entry submitted');
            }
        });
    });
}


//display all reflections
function displayReflections() {
    $.ajax({
        type: 'GET',
        url: REFLECTIONS_URL,
        success: function (data) {
            if (data.length === 0) {
                $('#reflections-container').html('No reflections found! Write a new entry!');
            };
            let reflectionInput = data.map(function (reflection, index) {
                return `<div id="entries">
                        <input type="hidden" class="reflectionID" value="${reflection._id}">
                        <p>Date: ${reflection.date}</p>
                        <p>Location: ${reflection.location}</p>
                        <button id="edit-button" class="reflections-button">Edit</butto>
                        <button id="delete-button" class="reflections-button">Delete</button>
                        <button id="current-button" class="reflections-button">View</button>
                        </div>`;
            });
            $('#reflections').html(reflectionInput);
        },
        failure: function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            $('reflections').html('No reflections found');
        }
    });
}

//display reflections by id
function displayReflectionsById() {
    let idParameter = $('#entries').find('.reflectionID').val();
    console.log(idParameter);
    $.ajax({
        type: 'GET',
        url: REFLECTIONS_URL + '/' + idParameter,
        success: function (data) {

            let htmlOutput = "";
            htmlOutput += '<div class="current-reflection">';
            htmlOutput += '<input type="hidden" class="reflectionID" value="';
            htmlOutput += data._id;
            htmlOutput += '">';
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

            $('#reflections').html(htmlOutput);
        },
        failure: function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            $('reflections').html('No reflections found');
        }
    });
}

//update the selected reflection
//first retrieve the post by id and put data in form
function retrieveReflection() {
    $('#reflections').on('click', '#edit-button', function () {
        let idParameter = $(this).parent().find('.reflectionID').val();
        console.log(idParameter);
        $.ajax({
            type: 'GET',
            url: REFLECTIONS_URL + '/' + idParameter,
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
                $('#new-entry').html(`<form method="post" id="new-reflection">
                <input type="hidden" class="reflectionID" value="${data._id}">
                <fieldset>
                <legend>Write a reflection</legend>
                <label>Date</label><br>
                <input type="text" id="date" name="date" required value="${data.date}"><br>
                <label>Location</label><br>
                <input type="text" id="location" name="location" value="${data.location}" required><br>
                <label>Mood</label><br>
                <select name="mood" id="mood" value="${data.mood}"><br>
                <option>Happy</option>
                <option>Calm</option>
                <option>Angry/Frustrated</option>
                <option>Anxious</option>
                <option>Sad/Upset/Depressed</option>
                </select><br>
                <label>Reflect on it:</label><br>
                <textarea name="text" id="text" required>${data.text}</textarea><br>
                <input type="submit" id="update-button" value="Update">
                </fieldset>
                </form>`)
            }
        });
    });
}

//submit updated reflection
function updateReflection() {
    let idParameter = $('form').find('.reflectionID').val();
    let dateInput = $('form').parent().find('#date').val();
    let locationInput = $('form').parent().find('#location').val();
    let moodInput = $('form').parent().find('#mood').val();
    let textInput = $('form').parent().find('#text').val();
    let newDataInput = {
        'date': dateInput,
        'location': locationInput,
        'mood': moodInput,
        'text': textInput,
    };
    $.ajax({
        type: 'PUT',
        url: REFLECTIONS_URL + '/' + idParameter,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(newDataInput),
        success: function (data) {
            console.log(data);
        }
    })
}


//delete selected reflection
function deleteReflection() {
    let idParameter = $('div').find('.reflectionID').val();
    console.log(idParameter);
    $.ajax({
        type: 'DELETE',
        url: REFLECTIONS_URL + '/' + idParameter,
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            console.log('deleting reflection');
            displayReflections();
        },
        failure: function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            $('reflections').html('No reflections found');
        }
    })
};


function handleDisplayReflections() {
    $('#view-all-button').click(() => {
        displayReflections();
        $('.main-buttons').addClass('hide-display');
        $('.current-reflection').addClass('hide-display');
    });
}

function handleDisplayReflectionsById() {
    $('#reflections').on('click', '#current-button', function () {
        displayReflectionsById();
        $('.main-buttons').removeClass('hide-display');
    });
}

function handleDeleteReflections() {
    $('#reflections-container').on('click', '#delete-button', function () {
        deleteReflection();
        $('.main-buttons').addClass('hide-display');
    });
}

function handleUpdateReflection() {
    $('#new-entry').on('click', '#update-button', function (e) {
        e.preventDefault();
        updateReflection();
    });
}

$(function () {
    postNewReflection();
    handleDeleteReflections();
    handleDisplayReflections();
    handleDisplayReflectionsById();
    retrieveReflection();
    handleUpdateReflection();
})
