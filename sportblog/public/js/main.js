$(document).ready(() => {
  $('.category-delete').on('click', (e) => {
    $target = $(e.target);
    $.ajax({
      type : 'DELETE',
      url : '/categories/delete/'+$target.attr('data-cat-id'),
      success : (responde) => {
        alert('category removed');
        window.location.href='/'
      },
      error : (error) => {
        console.log(error);
      }
    });
  });
  $('.article-delete').on('click', (e) => {
    $target = $(e.target);
    $.ajax({
      type : 'DELETE',
      url : '/articles/delete/'+$target.attr('data-art-id'),
      success : (responde) => {
        alert('article removed');
        window.location.href='/'
      },
      error : (error) => {
        console.log(error);
      }
    });
  });
});
