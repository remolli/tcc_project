import Utility from '@/utils/Utility';
import Cookie from 'js-cookie';

const KEY = '_list_tags_';
const TOKEN = '_nt_token_';
const USERKEY = '_nt_username_';
const EMAILKEY = '_nt_email_';
const OTHERKEY = '_nt_test';

export default {
    setToken(value) {
        try{
            Cookie.set(TOKEN, value, 1);
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
            var result = Utility.numbers(new String(value))
            Cookie.set(USERKEY, value, 1);
            Cookie.set(OTHERKEY, result, 1);
            return true;
        } catch(error){ return false; }
    },
    getUsername() {
        return Cookie.get(USERKEY);
    }, 
    getOther() {
        return Cookie.get(OTHERKEY);
    }, 
    deleteUsername() {
        Cookie.remove(OTHERKEY);
        return Cookie.remove(USERKEY);
    }, 

    setEmail(value) {
        try{
            Cookie.set(EMAILKEY, value, 1);
            return true;
        } catch(error){ return false; }
    },
    getEmail() {
        return Cookie.get(EMAILKEY);
    }, 
    deleteEmail() {
        return Cookie.remove(EMAILKEY);
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
