/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//DATA
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

$(document).ready(function () {
  // fetching tweets from the http://localhost:8080/tweets page
  const loadTweets = function () {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        console.log(renderTweets(tweets));
      },
      error: (err) => {
        console.log(err);
      },
    });
  };
  loadTweets();
  //rendering all tweets on the page
  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $tweet = $(createTweetElement(tweet));
      $("#tweets-container").prepend($tweet);
    }
  };

  //Use an escape function for safe user input
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //creating tweet with user and content info
  const createTweetElement = function (tweet) {
    let $tweet = `<article class="tweet">
  <header>
    <div class="user">
      <img src=${escape(tweet.user.avatars)} alt="">
      <h3>${escape(tweet.user.name)}</h3>
    </div>
    <span>${escape(tweet.user.handle)}</span>
  </header>
  <p>${escape(tweet.content.text)}</p>
  <footer>
  <span>${escape(timeago.format(tweet.created_at))}</span>
    <div class="flag">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>`;
    return $tweet;
  };
  renderTweets(data);

  //Add an Event Listener and Prevent the Default Behaviour
  const $form = $(".submit-tweet");
  $form.on("submit", function (event) {
    // Prevent the Default Behaviour
    event.preventDefault();

    // encoding data string by serializing form values.
    let data = $(this).serialize();

    //Data checks and validations
    $(".errorText").slideUp().text("");

    if (!$(this).children().find("textarea").val()) {
      return $(".errorText").text("⚠️ Please enter a valid tweer").slideDown();
    }
    if ($(this).children().find("textarea").val().length > 140) {
      return $(".errorText")
        .text("⚠️ Your tweet exceeds the maximum characters")
        .slideDown();
    }
    //clear textArea
    $(this).children().find("textarea").val("");
    //refresh number of characters
    $(".counter").text(140);

    //Verify the AJAX request
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "POST",
      data: data,
      success: (data) => {
        console.log(data);
        loadTweets();
      },
      error: (err) => {
        console.log(err);
      },
    });
  });
});
