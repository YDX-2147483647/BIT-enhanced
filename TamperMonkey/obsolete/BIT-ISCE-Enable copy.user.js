// ==UserScript==
// @name         BIT-ISCE-Enable copy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  【网站似已关闭】Enable copy function
// @author       Y.D.X.
// @match        http://iscp.isclab.org/user/schoice
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.body.oncopy= e => {
        console.log(e, 'copy');
        return true;
    }
})();