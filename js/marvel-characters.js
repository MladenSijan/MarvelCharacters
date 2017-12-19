$(document).ready(function() {
  var PUBLIC_KEY = '42ccc28e9887a3382a291a1061340c27';
  var PRIV_KEY = 'f19af8e1a229fc944ecc5485d8b933620288f7cc';
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

  var character = {
    id: 0,
    name: '',
    imgPath: '',
    bookmarked: false,
    saveChar: function() {
      localStorage.setItem(this.id, JSON.stringify(this));
    },
    deleteChar: function() {
      localStorage.removeItem(this.id);
    }
  }

  function exists(char_id) {
    if (localStorage.length > 0) {
      var allChars = JSON.parse(localStorage.getItem(char_id));
      for (var char in allChars) {
        if (char_id === allChars[char]['id']) {
          return true;
        }
        else{
          return false;
        }
      }
    } else return false;
  }

  function showBookmarkedChars() {
    if (localStorage['length'] > 0) {
      var characterAttr;
      var id;
      var name;
      var imgSrc;
      var bookmarked;
      var checked;
      var helperArray = [];

      for (var i = 0; i < localStorage.length; i++) {
        helperArray.push(JSON.parse(localStorage.getItem(Object.keys(localStorage)[i])));
      }

      $(".bookmarked_chars_wrapper").append('<h3>Your bookmarked characters</h3>');

      for (var i = 0; i < helperArray.length; i++) {
        id = helperArray[i]['id'];
        name = helperArray[i]['name'];
        imgSrc = helperArray[i]['imgPath'];
        bookmarked = helperArray[i]['bookmarked'];
        if (bookmarked) checked = 'checked';
        else checked = '';

        $(".bookmarked_chars_wrapper").append(
          "<div class='character character_bookmarked'><div class='char_name' id='" + id +
          "'><p class='name'>" + name +
          "</p></div><div class='img_wrapper' style='background-image:url("+imgSrc+")'></div><span class='remove_bookmark'><span class='fa fa-trash'></span></span>" +
          "<input type='checkbox' class='bookmark_checkbox prettyCheckbox' " + checked + "></div>"
        );
      }
    }
    else {
      $(".bookmarked_chars_wrapper").html('You have no bookmarked characters yet.');
    }
  }

  function getBookmarkedChars() {
    if (localStorage['length'] > 0) {
      var characterAttr;
      var charId;
      var bookmarked;
      var checked;
      var checkedChars = [];
      var helperArray = [];

      for (var i = 0; i < localStorage.length; i++) {
        helperArray.push(JSON.parse(localStorage.getItem(Object.keys(localStorage)[i])));
      }

      for (var i = 0; i < helperArray.length; i++) {
        charId = helperArray[i]['id'];
        bookmarked = helperArray[i]['bookmarked'];
        checkedChars.push(charId);
      }
      if (checkedChars.length > 0) return checkedChars;
      else return 0;
    }
    else return 0
  }

  function showSearchResults(results, bookmarkedChars) {
    if (results.length > 0) {
      var id;
      var name;
      var imgSrc;
      var imgSize = 'standard_xlarge';
      var checked = '';
      var remove_bookmark = '';
      var remove = 'Bookmark';

      $(".search_results_wrapper").append("<h3>Search results</h3>");

      for (var charResult in results) {
        id = results[charResult]['id'];
        name = results[charResult]['name'];
        imgSrc = results[charResult]['thumbnail']['path'] + '/' +
                 imgSize + '.' +
                 results[charResult]['thumbnail']['extension'];

        if (bookmarkedChars.length > 0 &&
            bookmarkedChars !== undefined
        ) {
          for (var i = 0; i < bookmarkedChars.length; i++) {
            if (bookmarkedChars[i] == id){
              checked = 'checked';
              remove_bookmark = "remove_";
              remove = "<span class='fa fa-trash'>";
            }
          }
        }
        $(".search_results_wrapper").append(
          "<div class='character'><div class='char_name' id='" + id +
          "'><p class='name'>" + name +
          "</p></div><div class='img_wrapper' style='background-image:url("+imgSrc+")'></div><span class='" + remove_bookmark + "bookmark'>"+remove+"</span>" +
          "<input type='checkbox' class='bookmark_checkbox prettyCheckbox' " + checked + "></div>"
        );
        checked = '';
        remove = 'Bookmark';
        remove_bookmark = '';
      }
    }
    else {
      $(".search_results_wrapper").html('There are no characters for a given input.');
    }
  }

  function resetBoxes() {
    $(".search_results_wrapper").html('');
    $(".bookmarked_chars_wrapper").html('');
  }

  $(this).on('click', 'span.bookmark', function() {
    var bookmarkChar = $(this);
    character.id = bookmarkChar.parent().find('.char_name').attr('id');
    var bgImg = bookmarkChar.parent().find('.img_wrapper').css('background-image');
    bgImg = bgImg.replace('url(','').replace(')','').replace(/\"/gi, "");
    character.imgPath = bgImg;
    character.name = bookmarkChar.parent().find('p.name').text();
    character.bookmarked = !bookmarkChar.next().is(':checked');
    if (character.bookmarked && !exists(character.id))
      character.saveChar();
  });

  $(this).on('click', 'span.remove_bookmark', function() {
    var bookmarkChar = $(this);
    character.id = bookmarkChar.parent().find('.char_name').attr('id');
    character.bookmarked = !bookmarkChar.next().is(':checked');
    if ((!character.bookmared && exists(character.id)) === false)
      character.deleteChar();
  });

  showBookmarkedChars();

  $("input#char_search").on('keyup paste', function(event) {
    resetBoxes();

    var inputValue = $(this).val();
    if (inputValue === '') {
      showBookmarkedChars();
    }
    else {
      $.ajax({
        type: 'GET',
        // url: 'marvelJSONeg.json',
        url: 'https://gateway.marvel.com:443/v1/public/characters',
        data: {
          nameStartsWith: inputValue,
          limit: 12,
          apikey: PUBLIC_KEY,
          ts: ts,
          hash: hash
        },
        dataType: 'json',
        success: function(data) {
          resetBoxes();
          var results = data['data']['results'];
          var bookmarkedChars = getBookmarkedChars();
          showSearchResults(results, bookmarkedChars);
        },
        error: function() {
          $('.search_results_wrapper').html("We are unable to retrieve a character list at the moment. Try again later.");
        }
      });
    }
  });
});
