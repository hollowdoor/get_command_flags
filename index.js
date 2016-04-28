var hasProcess = typeof process === 'object',
    hasWindow = typeof window !== 'undefined';

//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript

/*
git remote add origin https://github.com/hollowdoor/get_command_flags.git
git push -u origin master
*/

module.exports = getFlags;

function getFlags(){
    var args, parts, flags = {}, wasFlag;

    if(!hasWindow){
        args = process.argv.slice(2);
        for(var i=0; i<args.length; i++){
            if(args[i].length === 2 && /--/.test(args[i])) break;

            if(isFlag(args[i])){

                if(/^[\S]+=[\S]+$/.test(args[i])){
                    parts = args[i].split('=');
                    flags[toKey(parts[0])] = toJSValue(parts[1]);
                    wasFlag = false;
                }else{
                    flags[toKey(args[i])] = true;
                    wasFlag = args[i];
                }
            }else if(wasFlag){
                flags[toKey(wasFlag)] = toJSValue(args[i]);
                wasFlag = false;
            }
        }
    }else if(hasWindow){
        args = (function(a) {
            if (a == "") return {};
            var b = {};
            for (var i = 0; i < a.length; ++i)
            {
                var p=a[i].split('=', 2);
                if (p.length == 1)
                    b[p[0]] = "";
                else
                    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
            return b;
        })(window.location.search.substr(1).split('&'));

        for(var name in args){
            if(args[name] === ''){
                flags[name] = true;
            }else{
                flags[name] = toJSValue(args[name]);
            }
        }
    }

    return flags;
}

function isFlag(flag){
    return /^-[^-]/.test(flag) || /^--[^-][^-]+/.test(flag);
}

function toJSValue(value){

    if(value === 'true'){
        return true;
    }else if(value === 'false'){
        return false;
    }else if(!isNaN(value)){
        if(/\./.test(value)){
            return parseFloat(value);
        }else{
            return parseInt(value);
        }
    }

    try{
        return JSON.parse(value);
    }catch(e){}

    return value;
}

function toKey(name){
    return name.replace(/^-+/, '');
}
