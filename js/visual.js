$(document).ready(function() {

  $('input[type="text"]').on("keyup focus", function () {
    if( $(this).val().length === 0 ) {
      $(this).prev().filter(".appearing_label").css("opacity", "0");
    }
    else{
      $(this).prev().filter(".appearing_label").css("opacity", "1");
    }
  });

  $('input').on("blur", function () {
      $(this).prev().filter(".appearing_label").css("opacity", "0");
  });

  $(this).on('click', 'span.bookmark', function() {
      var bookmark = $(this);
      bookmark.removeClass('bookmark')
              .addClass('remove_bookmark')
              .html('<span class="fa fa-trash"></span>');
  });

  $(this).on('click','span.remove_bookmark', function(event) {
      var remove_bookmark = $(this);
      var checkbox = remove_bookmark.parent().find('.bookmark_checkbox');

      checkbox.attr('checked', !checkbox.is(':checked'));

      var isChecked = checkbox.val();

      if (isChecked) {
        checkbox.closest('.character_bookmarked').remove();
        remove_bookmark.removeClass('remove_bookmark')
                       .addClass('bookmark')
                       .html('Bookmark');
      }
  });
});
