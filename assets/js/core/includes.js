const loadHtmlSuccesCallBack = [];

export function onLoadHtmlSuccess(callback){
    if(!loadHtmlSuccesCallBack.includes(callback)){
        loadHtmlSuccesCallBack.push(callback);
    }
}

function loadIncludes(parent){
    if(!parent)
        parent = 'body';
    $(parent).find('[wm-include]').each((i, e) =>{
        const url = $(e).attr('wm-include');
        $.ajax({
            url,
            success(data){
                $(e).html(data);
                $(e).removeAttr('wm-include');
                
                loadHtmlSuccesCallBack.forEach(
                    callback => callback(data));
                loadIncludes(e);
            }
        })
    });
}

loadIncludes(null, jQuery);