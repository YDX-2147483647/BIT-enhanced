// ==UserScript==
// @name         BIT-第二课堂-我的报名-弱化已取消课程
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  给可报名的课程设置颜色
// @license      GPL-3.0-or-later
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        http://dekt.bit.edu.cn/course/QueryMyCourseList.jsp*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  function add_style_sheet () {
    const sheet = document.createElement('style')
    sheet.innerHTML = `
        #main > form[name='form1'] tr.cancelled > td,
        #main > form[name='form1'] tr.cancelled > td > a {
            color: lightgray;
        }
        `
    document.head.appendChild(sheet)
  }

  function check () {
    for (const row of document.querySelectorAll("#main > form[name='form1'] table > tbody > tr:nth-child(n+2)")) {
      row.children[7].style.paddingLeft = '0' // 原来是 5px，会让“开放浏览”分到两行

      const cancel_description = row.children[8].textContent.trim()
      if (cancel_description === '取消原因') {
        row.classList.add('cancelled')
      }
    }
  }

  add_style_sheet()
  check()
})()
