import Cookie from '@/plugins/cookies';

export default {
    redirectIfAuthenticated(to, from, next) {
        const token = Cookie.getToken();

        let n;
        if (token) {
            n = { name: 'home' };
        }
        next(n);
    },
};
