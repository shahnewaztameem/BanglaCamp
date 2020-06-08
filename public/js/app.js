$('.ui.tiny.modal').modal({
  blurring: true
}).modal('attach events', '.delete.button', 'show');

$('.ui.mini.modal').modal({}).modal('attach events', '.deleteComment.button', 'show');
$('.ui.small.modal').modal({closable: false}).modal('attach events', '.editComment.button', 'show');

// show tooltip on hover
$('.edit').popup({});
$('.delete').popup({});




