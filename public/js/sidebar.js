$(document).ready(function () {
    $('#Sidebar li.active').removeClass('active');
    $('a[href="' + location.pathname + '"]').closest('li').addClass('active');
});