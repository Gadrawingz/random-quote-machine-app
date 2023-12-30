// JS Time

// Variables used 
let dataOfQuotes;
let colors = ['brown', 'green', 'black', 'red'];
var currentQuote = '', currentAuthor = '';

function getQuotes() {
    return $.ajax({
      headers: {
        Accept: 'application/json'
      },
      url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
      success: function (jsonQuotes) {
        if (typeof jsonQuotes === 'string') {
            dataOfQuotes = JSON.parse(jsonQuotes);
            console.log(dataOfQuotes);
            console.log('dataOfQuotes');
        }
      }
    });
}

function getRandomQuote() {
    return dataOfQuotes.quotes[
      Math.floor(Math.random() * dataOfQuotes.quotes.length)
    ];
  }
  
  function getQuote() {
    let randomQuote = getRandomQuote();
    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;
  
    $('#tweet-quote').attr(
      'href',
      'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );
  
    $('.quote-text').animate({ opacity: 0 }, 500, function () {
      $(this).animate({ opacity: 1 }, 500);
      $('#text').text(randomQuote.quote);
    });
  
    $('.quote-author').animate({ opacity: 0 }, 500, function () {
      $(this).animate({ opacity: 1 }, 500);
      $('#author').html(randomQuote.author);
    });
  
    var color = Math.floor(Math.random() * colors.length);
    $('html body').animate(
      {
        backgroundColor: colors[color],
        color: colors[color]
      },
      1000
    );
    $('.button').animate(
      {
        backgroundColor: colors[color]
      },
      1000
    );
  }
  
  $(document).ready(function () {
    getQuotes().then(() => {
      getQuote();
    });
  
    $('#new-quote').on('click', getQuote);
  });