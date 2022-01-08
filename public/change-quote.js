const submitButton = document.getElementById('submit-change');
const newQuoteContainer = document.getElementById('new-quote');

submitButton.addEventListener('click', () => {
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;
  const year = document.getElementById('year').value;
    const id = document.getElementById('id').value;
  

  fetch(`/api/quotes/${id}?quote=${quote}&person=${person}&year=${year}`, {
    method: 'PUT',
  })
  .then(response => {
    // console.log(response);
      return response.json();
    
  })
  .then( quote => { 
        // console.log(quote);
      const newQuote = document.createElement('div');
      newQuote.innerHTML = `
              <h3>Congrats, your quote was changed!</h3>
              <div>Quote Number: ${quote.id}</div>
              <div class="quote-text">${quote.quote}</div>
              <div class="attribution">- ${quote.person} ${quote.year}</div>
              <p>Go to the <a href="index.html">home page</a> to view all changes to quotes.</p>
              `;
      newQuoteContainer.appendChild(newQuote);
      document.getElementById('quote').value = '';
      document.getElementById('person').value = '';
      document.getElementById('year').value = '';
      document.getElementById('id').value = '';
  });
});