// ==UserScript==
// @name:zh         中青在线-青年大学习
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  显示控件
// @author       You
// @match        http://h5.cyol.com/special/daxuexi/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    document.querySelector("video#Bvideo").setAttribute("controls","");
})();