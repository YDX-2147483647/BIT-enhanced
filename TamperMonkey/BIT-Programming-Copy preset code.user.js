// ==UserScript==
// @name         BIT-Programming-Copy preset code
// @namespace    http://tampermonkey.net/
// @version      0.5.1
// @description  简化预设代码的复制操作
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        https://lexue.bit.edu.cn/mod/programming/view.php?*
// @match        https://lexue.bit.edu.cn/mod/programming/history.php?*
// @grant        none
// ==/UserScript==

// shCore.js 的HTML转义是一个一个替换字符的，不保险。
// 所以还是利用下面的 innerHTML/textContent ，即平常直接复制的那里吧……

(function () {
  'use strict'

  // interval's unit: ms.
  function wait_until_presence (selector, interval) {
    return new Promise((resolve, reject) => {
      const check = setInterval(function () {
        if (document.querySelector(selector)) {
          clearInterval(check)
          resolve(document.querySelector(selector))
        }
      }, interval)
    })
  }

  function get_this_code (sender) {
    while (sender != null && sender.className.indexOf('dp-highlighter') === -1) {
      sender = sender.parentNode
    }

    let code = sender.querySelector('ol.dp-c').innerText
    // 要把 &nbsp; （U+00A0）换成普通空格，不然到 Dev-C++ 那里就变成“牋爏……”了
    code = code.replaceAll('\u00a0', '\u0020')
    return code
  }

  if (document.querySelector('.presetcode') || window.location.pathname.includes('history')) {
    wait_until_presence('.dp-highlighter > .bar > .tools', 100).then(toolbar => {
      const copy_button = document.createElement('pre')
      copy_button.textContent = '(copy me to copy the whole)'

      // Style
      copy_button.style.fontSize = '0.9em'
      copy_button.style.color = '#a0a0a0'
      copy_button.style.backgroundColor = 'inherit'
      copy_button.style.textDecoration = 'none'
      copy_button.style.marginLeft = '10px'
      copy_button.style.fontFamily = 'sans-serif'
      copy_button.style.display = 'inline'

      copy_button.addEventListener('copy', function (e) {
        e.clipboardData.setData('text/plain', get_this_code(e.target))
        e.preventDefault()
      })

      toolbar.appendChild(copy_button)
    })
  }
})()
