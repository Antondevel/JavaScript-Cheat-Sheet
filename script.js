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
