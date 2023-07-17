// ==UserScript==
// @name         中国大学MOOC-修复图片
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  修复讨论区的图片
// @license      GPL-3.0-or-later
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @require      https://gitee.com/YDX-2147483647/BIT-enhanced/raw/main/TamperMonkey/lib/mooc.js
// @match        https://www.icourse163.org/learn*
// @match        https://www.icourse163.org/spoc/learn*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'
  /* global Mooc */

  function change_origin (url) {
    return 'https://img-ph-mirror.nosdn.127.net' + (new URL(url)).pathname
  }

  function main () {
    document.querySelectorAll("img[src^='https://img0.ph.126.net']")
      .forEach(img => { img.src = change_origin(img.src) })
  }

  Mooc.on_every_loaded(main)
  window.addEventListener('hashchange', () => Mooc.on_every_loaded(main))
})()
