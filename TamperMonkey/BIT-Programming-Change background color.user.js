// ==UserScript==
// @name         BIT-Programming-Change background color
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  给AC、WA以外的测试结果设置颜色
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        https://lexue.bit.edu.cn/mod/programming/result.php?*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict'

  function set_color (row, color) {
    for (const column of row.querySelectorAll('.cell')) {
      column.style.backgroundColor = color
    }
  }

  for (const r of document.querySelectorAll('#test-result-detail > table > tbody > tr')) {
    const result = r.querySelector('.cell.c12').innerText
    let color = null

    if (result.includes('RE:')) {
      color = 'LightBlue'
    } else if (result.includes('FPE:')) {
      color = 'BlanchedAlmond'
    } else if (result.includes('TLE:')) {
      color = 'Tomato'
    } else if (result.includes('KS:')) {
      color = 'Violet'
    }

    if (color) {
      set_color(r, color)
    }
  }
})()
