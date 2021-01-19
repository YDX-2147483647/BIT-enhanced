// ==UserScript==
// @name         BIT-批改网作文-允许粘贴
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  根据 init_no_paste() ，逐一删除事件侦听器
// @author       Y.D.X.
// @match        http://www.pigai.org/index.php?c=v2&a=write*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var cobj = $("#contents");
    cobj.off("contextmenu");
    cobj.off("keydown");
    cobj.off("dragenter");

    document.querySelector(".tips2 > ul").firstElementChild.innerText = "作文正文已不再禁止粘贴，但仍不应抄袭。";
})();