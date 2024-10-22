

function toggleSection(sectionId) {
    const content = document.getElementById(sectionId);

    // Если контент уже открыт, закрываем его
    if (content.classList.contains('open')) {
        content.classList.remove('open');
        content.style.maxHeight = null; // Сбрасываем max-height для плавного закрытия
    } else {
        // Закрываем все другие секции
        const allContents = document.querySelectorAll('.content');
        allContents.forEach((el) => {
            el.classList.remove('open');
            el.style.maxHeight = null; // Сбрасываем max-height для других секций
        });

        // Открываем текущий контент
        content.classList.add('open');
        content.style.maxHeight = content.scrollHeight + "px"; // Устанавливаем max-height на высоту контента
    }
}

// Поиск
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', function (event) {
    const query = event.target.value.toLowerCase();
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const items = section.querySelectorAll('li');
        let hasMatch = false;

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.classList.add('visible'); // Показываем подходящие элементы
                item.style.backgroundColor = 'black'; // Выделяем найденный элемент
                item.style.height = '100%'; // Устанавливаем высоту цветной полоски
                item.style.paddingTop = '10px'
                item.style.paddingBottom = '10px'
                item.style.paddingLeft = '10px'
                item.style.paddingRight = '10px'
                item.style.borderRadius = '5px'; // Устанавливаем радиус скругления углов
                hasMatch = true; // Отмечаем, что есть совпадение
            } else {
                item.classList.remove('visible'); // Скрываем неподходящие элементы
                item.style.backgroundColor = ''; // Сбрасываем цвет фона
                item.style.height = ''; // Сбрасываем высоту
                item.style.borderRadius = ''; // Сбрасываем радиус скругления
            }
        });


        // Открываем секцию, если есть совпадение
        if (hasMatch) {
            section.style.display = 'block';
            toggleSection(section.querySelector('h2').getAttribute('onclick').match(/'(.+?)'/)[1]); // Открываем секцию
        } else {
            section.style.display = 'none'; // Скрываем секцию, если нет совпадений
        }
    });
});
