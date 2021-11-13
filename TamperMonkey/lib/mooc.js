/**
 * @tutorial 可以通过脚本的`@require`来引入此文件。
 * 例如
 * // @require      https://gitee.com/YDX-2147483647/BIT-enhanced/raw/mooc/TamperMonkey/lib/mooc.js
 * // @require      https://github.com/YDX-2147483647/BIT-enhanced/raw/mooc/TamperMonkey/lib/mooc.js
 */

/**
 * 中国大学 MOOC 相关
 */
const Mooc = {
    /**
     * 检查是否存在加载条
     * @returns {true|false|null} `null`表示不确定
     */
    _exist_loading_bar() {
        /** @type {HTMLElement} */
        const loading_bars = document.querySelectorAll('#loadingPb, .u-loading');
        for (const bar of loading_bars) {
            if (bar) {
                return bar.style.display !== 'none';
            }
        }
        return null;
    },

    /**
     * 页面加载完后 resolve。
     * @param {{interval: number}} options `interval`的单位为 ms。
     * @returns {Promise}
     */
    loaded({ interval = 200 } = {}) {
        return new Promise((resolve, reject) => {
            let check = setInterval(() => {
                if (Mooc._exist_loading_bar() === false) {
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
                if (Mooc._exist_loading_bar() === true) {
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