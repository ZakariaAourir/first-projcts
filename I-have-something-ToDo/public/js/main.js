$(document).ready( () => {
  $('.delete-todo').on('click', (e) => {
    $target = $(e.target);
    const id = $target.attr('data-id');
    console.log(id);
    $.ajax({
      type : 'DELETE',
      url :'/todo/delete/'+id,
      success : (responde) => {
        alert('deleting todo');
        window.location.href='/';
      },
      error : (error) => {
        console.log(error);
      }
    });
  });
});
