const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, getIndexById, updateElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
// 4.
app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    // console.log(randomQuotes);
    res.send({ quote: randomQuote});
});

// 5
app.get('/api/quotes', (req, res, next) => {
    const author  = req.query.person;
    // console.log(author);
    if (author) {
        // filters quote by req.query.author
        const filteredQuotes = quotes.filter( quote => quote.person.toLowerCase().includes(author.toLowerCase()))
        // console.log(filteredQuotes);
        res.send({ quotes: filteredQuotes });
    } else if (author === undefined) {
        // console.log(quotes);
        res.send({ quotes: quotes });
    } else {
        res.send([]);
    }
});

// 6.
app.post('/api/quotes', (req, res, next) => {
    // ?quote="I am become Death, the destroyer of worlds."&person="J. Robert Oppenheimer"
    const randomQuoteId = () => {
        let randomId = Math.floor(Math.random() * 1000);
        return randomId;
      };
    const newQuote = { quote: req.query.quote, person: req.query.person, year: req.query.year, id: randomQuoteId()};
    const responseQuote = { quote: newQuote };
    
    if (req.query.quote && req.query.person && req.query.year) {
        quotes.push(newQuote);
        res.status(201).send(responseQuote);
    } else {
        res.status(400).send();
    }
}); 

// 8.1 - PUT request
app.put('/api/quotes/:id', (req, res, next) => {
    const quotesIndex = getIndexById(req.params.id, quotes);
    if (quotesIndex !== -1) {
    updateElement(req.params.id, req.query, quotes);
    // console.log(quotes[quotesIndex]);
    res.send(quotes[quotesIndex]);
  } else {
    res.status(404).send();
  }
});
// // DELETE request
app.delete('/api/quotes/:id', (req, res, next) => {
    const quotesIndex = getIndexById(req.params.id, quotes);
    if (quotesIndex !== -1) {
    quotes.splice(quotesIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});
// 3.
app.listen(PORT);
