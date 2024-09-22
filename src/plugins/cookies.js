import Cookie from 'js-cookie';

const KEY = '_list_tags_';
const TOKEN = '_nt_token_';
const USERKEY = '_nt_username_';

export default {
    setToken(value) {
        try{
            Cookie.set(TOKEN, value);
            return true;
        } catch(error){ return false; }
    },
    getToken() {
        return Cookie.get(TOKEN);
    }, 
    deleteToken() {
        return Cookie.remove(TOKEN);
    }, 

    setUsername(value) {
        try{
            Cookie.set(USERKEY, value);
            return true;
        } catch(error){ return false; }
    },
    getUsername() {
        return Cookie.get(USERKEY);
    }, 
    deleteUsername() {
        return Cookie.remove(USERKEY);
    }, 

    set(value) {
        try{
            Cookie.set(KEY, value);
            return true;
        } catch(error){ return false; }
    },

    get() {
        return Cookie.get(KEY)?.split(',');
    }, 
    
    add(value) {
        try{
            var list = Cookie.get(KEY)?.split(',') || [];
            if(list.length>=4) this.remove();
            list.unshift(value);
            this.set(list);
            return true;
        } catch(error){ return false; }
    },
    
    remove() {
        try{
            var list = Cookie.get(KEY)?.split(',') || [];
            list.pop();
            this.set(list);
            return true;
        } catch(error){ return false; }
    },

    delete() {
        try{
            Cookie.remove(KEY);
            return true;
        } catch(error){ return false; }
    },
};
