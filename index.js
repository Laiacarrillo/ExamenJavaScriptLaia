function openMenu() {
    let menu = document.getElementById('menu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('fade-in');
    } else {
        menu.classList.add('hidden');
        menu.classList.remove('fade-in');
    }
}