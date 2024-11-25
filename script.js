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

    // Удаляем 'highlight' со всех элементов перед началом нового поиска
    document.querySelectorAll('.highlight').forEach(item => {
        item.classList.remove('highlight');
    });

    // Если запрос пуст, показываем все секции и выходим из обработчика
    if (!query) {
        sections.forEach(section => {
            section.style.display = 'block';
        });
        return;
    }

    sections.forEach(section => {
        const items = section.querySelectorAll('li');
        let hasMatch = false;

        items.forEach(item => {
            const methodText = item.querySelector('strong') ? item.querySelector('strong').textContent.toLowerCase() : ''; // Поиск по методу в <strong>

            if (methodText.includes(query)) {
                item.classList.add('highlight'); // Добавляем класс только к найденному элементу
                hasMatch = true; // Отмечаем, что есть совпадение

                // Перемещаем найденный элемент наверх в списке
                item.parentNode.prepend(item);
            } else {
                item.classList.remove('highlight'); // Убираем выделение с неподходящих элементов
            }
        });

        // Открываем секцию, если есть совпадение
        if (hasMatch) {
            section.style.display = 'block';
            // Открываем секцию с использованием соответствующей кнопки аккордеона
            toggleSection(section.querySelector('h2').getAttribute('onclick').match(/'(.+?)'/)[1]);
        } else {
            section.style.display = 'none'; // Скрываем секцию, если нет совпадений
        }
    });
});

// Добавляем стили для highlight-элемента через CSS
const style = document.createElement('style');
style.innerHTML = `
    .highlight {
        background-color: black;
        color: white;
        padding: 10px;
        border-radius: 5px;
    }
`;
document.head.appendChild(style);

// Получаем все кнопки аккордеона
const accordionButtons = document.querySelectorAll('.accordion-button');

// Перебираем каждую кнопку и добавляем обработчик события
accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Получаем родительский элемент для кнопки (секцию)
        const accordionContent = button.nextElementSibling;

        // Тоглим класс 'active' для кнопки
        button.classList.toggle('active');

        // Проверяем, открыта ли секция, и меняем её стиль
        if (accordionContent.style.display === 'block') {
            accordionContent.style.display = 'none';
        } else {
            accordionContent.style.display = 'block';
        }
    });
});
