// ==UserScript==
// @name         BIT-Programming-Copy testcases
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  简化测试输入、输出的复制操作
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        https://lexue.bit.edu.cn/mod/programming/view.php?*
// @match        https://lexue.bit.edu.cn/mod/programming/result.php?*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  document.querySelectorAll("a[href*='download=0']").forEach(
    function (a) {
      const copy_button = document.createElement('pre')
      copy_button.textContent = '(copy)'

      // Style
      copy_button.style.fontSize = '9pt'
      copy_button.style.margin = '0.5em'
      copy_button.style.display = 'inline'
      copy_button.style.color = 'darkgray'

      a.parentNode.insertBefore(copy_button, a.parentNode.lastChild)

      // TODO: 这还是会引起不必要的GET
      fetch(a.href).then(
        res => res.text()
      ).then(plaintext => {
        copy_button.addEventListener('copy', function (event) {
          event.clipboardData.setData('text/plain', plaintext)
          event.preventDefault()
        })
      })
    }
  )
})()
