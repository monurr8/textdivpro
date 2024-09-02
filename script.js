const inputText = document.getElementById('input-text');
const formatBtn = document.getElementById('format-btn');
const clearBtn = document.getElementById('clear-btn');
const output = document.getElementById('output');

formatBtn.addEventListener('click', () => {
  const text = inputText.value.trim();
  const words = text.split(' ');
  const maxLineLength = 60;
  const totalCharacters = words.join(' ').length;
  const numLines = Math.ceil(totalCharacters / maxLineLength);
  const formattedText = [];
  let line = '';
  let charCount = 0;

  words.forEach((word) => {
    if (charCount + word.length + (line ? 1 : 0) <= maxLineLength) {
      if (line) {
        line += ' ';
        charCount += 1; // Account for the space
      }
      line += word;
      charCount += word.length;
    } else {
      formattedText.push(line);
      line = word;
      charCount = word.length;
    }
  });

  if (line !== '') {
    formattedText.push(line);
  }

  // Adjust lines to ensure they are more evenly distributed
  const idealLineLength = Math.ceil(totalCharacters / numLines);
  let adjustedText = [];
  let newLine = '';
  let newLineCharCount = 0;

  formattedText.forEach((line) => {
    const words = line.split(' ');
    words.forEach((word) => {
      if (newLineCharCount + word.length + (newLine ? 1 : 0) <= idealLineLength) {
        if (newLine) {
          newLine += ' ';
          newLineCharCount += 1;
        }
        newLine += word;
        newLineCharCount += word.length;
      } else {
        adjustedText.push(newLine);
        newLine = word;
        newLineCharCount = word.length;
      }
    });

    if (newLine !== '') {
      adjustedText.push(newLine);
      newLine = '';
      newLineCharCount = 0;
    }
  });

  const outputHtml = adjustedText.map((line, index) => {
    return `
      <div class="line">
        <span>${line}</span>
        <button class="copy-btn" data-index="${index}">Copy</button>
        <span class="char-count">(${line.length} characters)</span>
      </div>    
    `;
  }).join('');

  output.innerHTML = outputHtml;

  const copyBtns = document.querySelectorAll('.copy-btn');

  copyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      const text = adjustedText[index];
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
