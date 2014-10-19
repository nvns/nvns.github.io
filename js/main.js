$(document).ready(function() {

  var highlightMenu = function(page) {
    // mark current li element as active
    var li = $('#navbar a[href="' + page + '"]').first().parent();
    $(li).toggleClass('active', true);

    // mark sibling li elements as not active
    $(li).siblings().each(function(i, sibling) {
      $(sibling).toggleClass('active', false);
    });
  }

  var page = _.last(window.location.href.split('/'));
  highlightMenu(page);
});
