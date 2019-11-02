function showLoading() {
    console.log("start loading");
    $("#loader").show();
}

function hideLoading() {
    console.log("stop loading");
    $("#loader").hide();
}

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
            callbackError(xhr.status);
            hideLoading();
        }
    }).done(function(html) {
        hideLoading();
    });
}