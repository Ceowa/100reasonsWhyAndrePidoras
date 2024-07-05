$(document).ready(function () {
    let start = 0;
    const limit = 10;
    const reasonsContainer = $('#reasons-container');
    const loading = $('#loading');

    function loadReasons() {
        loading.show();
        $.ajax({
            url: `/reasons/${start}/${start + limit}`,
            method: 'GET',
            success: function (data) {
                data.forEach((reason, index) => {
                    const delay = index * 100;
                    setTimeout(() => {
                        const reasonElement = $(`<a href="#" class="list-group-item list-group-item-action">${reason}</a>`);
                        reasonsContainer.append(reasonElement);
                        new ScrollMagic.Scene({
                            triggerElement: reasonElement[0],
                            triggerHook: 0.9
                        })
                        .setClassToggle(reasonElement[0], 'show')
                        .addTo(controller);
                    }, delay);
                });
                start += limit;
                loading.hide();
            }
        });
    }

    // Инициализация ScrollMagic
    const controller = new ScrollMagic.Controller();

    // Загрузка причин при загрузке страницы
    loadReasons();

    // Загрузка дополнительных причин при прокрутке вниз
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
            loadReasons();
        }
    });
});
