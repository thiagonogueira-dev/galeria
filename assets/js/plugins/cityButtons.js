import { onLoadHtmlSuccess } from '../core/includes.js';


const duration = 300;

function filterByCity(city){
    $('[wm-city]').each(function(i, e){
        const isTarget = $(this).attr('wm-city') === city 
            || city == null;

        if(isTarget){
            $(this).parent().removeClass('d-none');
            $(this).fadeIn(duration);
        } else{
            $(this).fadeOut(duration, () =>{
                $(this).parent().addClass('d-none');
            });
        }
    });
}

$.fn.cityButtons = function(){
    const cities = new Set;
    $('[wm-city]').each((i, e) =>{
        cities.add($(e).attr('wm-city'))
    });

    const btns = Array.from(cities).map(city =>{
        const btn = $('<button>')
            .addClass(['btn', 'btn-info', 'mt-2', 'ml-1'])
            .css('border-radius', '5px')
            .css('max-width', '150px')
            .html(city)
        btn.on('click', function(e){
            $('.active').removeClass('active');
            $(this).addClass('active');
            filterByCity(city);
        });
        return btn;
    });

    const btnAll = $('<button>')
        .addClass(['btn', 'btn-info', 'active', 'mt-2', 'ml-1'])
        .css('border-radius', '5px')
        .css('max-width', '130px')
        .html('Todas');
    btnAll.on('click',  function(e){
        $('.active').removeClass('active');
        $(this).addClass('active'); 
        filterByCity(null);
    });
    btns.unshift(btnAll);

    const btnGroup = $('<div>').addClass('btn-group row d-flex justify-content-center');
    btnGroup.append(btns);

    this.html(btnGroup)
    return this;
}

onLoadHtmlSuccess(function(){
    $('[wm-city-buttons]').cityButtons();
});
