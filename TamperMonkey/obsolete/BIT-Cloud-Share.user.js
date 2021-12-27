// ==UserScript==
// @name         BIT-Cloud-Share
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  enable the share function.
// @author       Y.D.X.
// @match        http://pan.bit.edu.cn/disk
// @match        https://webvpn.bit.edu.cn/http/77726476706e69737468656265737421e0f64fd225397c1e7b0c9ce29b5b/disk
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    config.settings.IS_SHARED = true;
    $("#leftPanel ul.menu > li.shares").show();
})();
