// ==UserScript==
// @name         BIT-Programming-Refresh result
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  自动刷新结果页
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        https://lexue.bit.edu.cn/mod/programming/result.php?*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'
  function auto_refresh () {
    const titles = document.querySelectorAll('[role=main] > h3')
    if (titles[0].innerText == '查看程序的测试结果' &&
            titles[0].nextSibling.innerText == '找不到您的程序') { return }
    if (titles[titles.length - 1].innerText != '测试结果') {
      location.reload()
    }
  }
  window.setInterval(auto_refresh, 2000)
})()
