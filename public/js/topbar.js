$(document).ready(function () {
    $('#topbar-nav li.active').removeClass('active');
    $('a[href="' + location.pathname + '"]').closest('li').addClass('active');
});