$(document).ready(function() {

  var showNavTargetDiv = function(htag) {
    console.log("Showing nav target "+ htag);
    // show active tab
    var li = $('#navbar a[href=' + htag + ']').first().parent();
    console.log("Activating nav tab "+ $(li).html());
    $(li).toggleClass('active', true);
    $(li).siblings().each(function(i, sibling) {
      console.log("Deactivating nav tab "+ $(sibling).html());
      $(sibling).toggleClass('active', false);
    });

    // hide all but requested div.nav-target on the page
    var div = $('div' + htag + '.nav-target').toggleClass('hidden', false);
    console.log('Showing ' + $(div).attr('id'));
    $(div).siblings('.nav-target').each(function(i, div) {
      console.log('Hiding ' + $(div).attr('id'));
      $(div).toggleClass('hidden', true);
    });
  }

  // first, on the initial page load, display the
  // div matching current URL
  var htag = window.location.hash || '#index';
  showNavTargetDiv(htag);

  // then attach a click listener that displays the
  // div matching nav item being clicked
  $('#navbar > li').each(function(i, li) {
    $(li).click(function(event) {
      // the post-hashtag part of the URL assigned to first <a/> child
      // of the current list element under #nav
      var tag = $(event.currentTarget).children('a').first().attr('href').split('#').pop();
      showNavTargetDiv('#' + tag);
      event.preventDefault();
    });
  });
});
