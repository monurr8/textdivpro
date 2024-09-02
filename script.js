const inputText = document.getElementById('input-text');
const formatBtn = document.getElementById('format-btn');
const clearBtn = document.getElementById('clear-btn'); // Get the clear button
const output = document.getElementById('output');

formatBtn.addEventListener('click', () => {
  const text = inputText.value.trim();
  const words = text.split(' ');
  const formattedText = [];
  let line = '';
  let wordCount = 0;
  let charCount = 0;

  words.forEach((word) => {
    if (wordCount < 9 && charCount + word.length + 1 <= 45) { // Increase word count to 9
      line += word + ' ';
      wordCount++;
      charCount += word.length + 1;
    } else {
      formattedText.push(line.trim());
      line = word + ' ';
      wordCount = 1;
      charCount = word.length + 1;
    }
  });

  if (line.trim() !== '') {
    formattedText.push(line.trim());
  }

  const outputHtml = formattedText.map((line, index) => {
    return `
      <div class="line">
        <span>${line}</span>
        <button class="copy-btn" data-index="${index}">Copy</button>
      </div>    
    `;
  }).join('');

  output.innerHTML = outputHtml;

  const copyBtns = document.querySelectorAll('.copy-btn');

  copyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      const text = formattedText[index];
      navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard!');
      });
    });
  });
});

// Clear button functionality
clearBtn.addEventListener('click', () => {
  inputText.value = ''; // Clear the text area
  output.innerHTML = ''; // Clear the output area
});
