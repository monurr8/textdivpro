const divideBtn = document.getElementById('divide-btn');
const clearBtn = document.getElementById('clear-btn');
const inputText = document.getElementById('input-text');
const outputContainer = document.getElementById('output-container');

divideBtn.addEventListener('click', () => {
    const text = inputText.value.trim();
    const minCharsPerLine = 50;
    const maxCharsPerLine = 65;
    const words = text.split(' ');
    const lines = [];

    let line = '';

    words.forEach(word => {
        // Check if adding the word exceeds the max character limit
        if (line.length + word.length + 1 > maxCharsPerLine) {
            if (line.length >= minCharsPerLine) {
                lines.push(line.trim());
                line = word + ' ';
            } else {
                // If line is less than 50 chars, keep adding words until it meets the minCharsPerLine
                line += word + ' ';
            }
        } else {
            line += word + ' ';
        }
    });

    // Push the final line if it has content
    if (line.trim()) {
        lines.push(line.trim());
    }

    const outputHtml = lines.map(line => {
        const charCount = line.length;
        return `<div class="output-line"><span>${line}</span><button class="copy-btn" data-clipboard-text="${line}">Copy</button><span class="character-count">${charCount} characters</span></div>`;
    }).join('');

    outputContainer.innerHTML = outputHtml;

    // Add event listener to copy buttons
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.getAttribute('data-clipboard-text');
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        });
    });
});

// Clear button functionality
clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputContainer.innerHTML = '';
});
