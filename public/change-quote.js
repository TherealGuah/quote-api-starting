const submitButton = document.getElementById('submit-change');
const newQuoteContainer = document.getElementById('new-quote');

submitButton.addEventListener('click', () => {
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;
  const year = document.getElementById('year').value;
    const id = document.getElementById('id').value;
  

  fetch(`/api/quotes/${id}`, {
    method: 'PUT',
  })
  .then(response => response.json())
  .then(({quote}) => {
    console.log(quote);
    const newQuote = document.createElement('div');
    newQuote.innerHTML = `
            <h3>Congrats, your quote was changed!</h3>
            <div>Quote Number: ${quote.id}</div>
            <div class="quote-text">${quote.quote}</div>
            <div class="attribution">- ${quote.person} ${quote.year}</div>
            <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
            `;
    newQuoteContainer.appendChild(newQuote);
  });
});