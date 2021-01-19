// ==UserScript==
// @name         BIT-Cloud-Share
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  enable the share function.
// @author       Y.D.X.
// @match        http://pan.bit.edu.cn/disk
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    config.settings.IS_SHARED = true;
    $("#leftPanel ul.menu > li.shares").show();
})();