/**
 * @see 中国大学MOOC-补足页面标题
 * @tutorial 可以通过脚本的`@require`来引入此文件。
 */

/**
 * 中国大学 MOOC 相关
 */
const Mooc = {
    /**
     * 页面加载完后 resolve。
     * @param {{interval: number}} options `interval`的单位为 ms。
     * @returns {Promise}
     */
    loaded({ interval = 200 } = {}) {
        return new Promise((resolve, reject) => {
            let check = setInterval(() => {
                /** @type {HTMLElement} */
                const loading_bar = document.querySelector('#loadingPb');
                if (loading_bar && loading_bar.style.display === 'none') {
                    clearInterval(check);
                    resolve('Loaded.');
                }
            }, interval);
        });
    },

    /**
     * 页面重新开始加载时 resolve。
     * @param {{interval: number}} options `interval`的单位为 ms。
     * @returns {Promise}
     */
    reloading_started({ interval = 100 } = {}) {
        return new Promise((resolve, reject) => {
            let check = setInterval(() => {
                /** @type {HTMLElement} */
                const loading_bar = document.querySelector('#loadingPb');
                if (loading_bar && loading_bar.style.display !== 'none') {
                    clearInterval(check);
                    resolve('Reloading started.');
                }
            }, interval);
        });
    },

    /**
     * 每次页面加载完后调用`listener`
     * @param {() => *} listener 
     * @param {{interval: number}} options `interval`的单位为 ms。
     */
    on_every_loaded(listener, options = {}) {
        Mooc.loaded(options).then(listener);

        const call_listener_and_re_listen = function handler() {
            listener();
            Mooc.reloading_started(options).then(Mooc.loaded(options)).then(handler);
        };
        Mooc.reloading_started(options).then(Mooc.loaded(options)).then(call_listener_and_re_listen);
    },
};