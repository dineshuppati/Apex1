// Toggle dark mode
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Show hidden message
function showMessage() {
    const message = document.getElementById('message');
    message.classList.toggle('hidden');
    message.classList.toggle('visible');
}