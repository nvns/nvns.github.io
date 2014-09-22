$(document).ready(function() {

  var showNavTargetDiv = function(htag) {
    // mark current li element as active
    var li = $('#navbar a[href=' + htag + ']').first().parent();
    $(li).toggleClass('active', true);

    // mark sibling li elements as not active
    $(li).siblings().each(function(i, sibling) {
      $(sibling).toggleClass('active', false);
    });

    // hide all but requested div.nav-target on the page
    var div = $('div' + htag + '_target.nav-target').toggleClass('hidden', false);
    $(div).siblings('.nav-target').each(function(i, div) {
      $(div).toggleClass('hidden', true);
    });

    // contact page is special, need to reload
    // the GMap iFrame when it's first shown to 
    // make it display correctly
    if ('#contact' === htag) {
      // yes it's just resetting the same URL which reloads the iframe
      document.getElementById('gmap').src = document.getElementById('gmap').src;
    }
  }

  var setupNavbarListeners = function() {
    // then attach a click listener that displays the
    // div matching nav item being clicked
    $('#navbar li').each(function(i, li) {
      $(li).click(function(event) {
        // the post-hashtag part of the URL assigned to first <a/> child
        // of the current list element under #nav
        var tag = $(event.currentTarget).children('a').first().attr('href').split('#').pop();
        showNavTargetDiv('#' + tag);
        $('.collapse').collapse('hide');
      });
    });
  }

  var showCurrentTargetDiv = function() {
    // first, on the initial page load, display the
    // div matching current URL
    var htag = window.location.hash || '#index';
    showNavTargetDiv(htag);
  }

  setupNavbarListeners();
  showCurrentTargetDiv();
});
