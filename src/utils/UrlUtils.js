class UrlUtils{
    getQueryVariable(variable)
    {
        var query = window.location.hash.split("?").pop();
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }
}

export default UrlUtils;