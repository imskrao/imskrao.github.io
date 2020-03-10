$(document).ready(function() {
    // back to new website
    setTimeout(function () {
        $('#to-new').css("top", "0");
    }, 1000)
    setTimeout(function () {
        $('#to-new').css("top", "-40px");
    }, 3000)
    $('#to-new').click(function () {
        window.location.pathname = '/'
    })
})