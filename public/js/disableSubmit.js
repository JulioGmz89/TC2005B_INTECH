$('#id_base, #user_key').bind('keyup', function () {
    if (allFilled()) $('#guardarAirtable').removeAttr('disabled');
});

function allFilled() {
    var filled = true;
    $('body input').each(function () {
        if ($(this).val() == '') filled = false;
        else { $('#guardarAirtable').prop("disabled", true); }
    });
    return filled;
}