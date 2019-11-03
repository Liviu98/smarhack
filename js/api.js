function showLoading() {
    console.log("start loading");
    $("#loader").show();
}

function hideLoading() {
    console.log("stop loading");
    $("#loader").hide();
}

function showError() {
    loadPage("error.html");
}

// const API_ROOT = 'http://localhost:5000/api';
const API_ROOT = 'https://runtimeterrorapi.azurewebsites.net/api';

function callEndpoint(route, type, data, callbackSuccess, callbackError) {
    console.log(data);
    $.ajax({
        url: route,
        type: type,
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify(data),
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem("Token"));
            showLoading();
        },
        success: function(data) {
            callbackSuccess(data);
        },
        complete: function(xhr, textStatus) {
            console.log(xhr.status);
            if (xhr.status > 299)
                callbackError(xhr.status);
            if (xhr.status == 500)
                showError();
            hideLoading();
        }
    }).done(function(html) {
        hideLoading();
    });
}

function loadPage(link) {
    $('#ajax-content').load(link);
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};