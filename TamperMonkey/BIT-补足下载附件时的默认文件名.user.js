// ==UserScript==
// @name         BIT-补足下载附件时的默认文件名
// @namespace    http://tampermonkey.net/
// @version      0.2.12
// @description  补充附件中 <a> 元素的 download 属性
// @license      GPL-3.0-or-later
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        https://jxzx.bit.edu.cn/*.htm
// @match        https://jwb.bit.edu.cn/*.htm
// @match        https://student.bit.edu.cn/*
// @match        https://www.bit.edu.cn/*.htm
// @match        https://opt.bit.edu.cn/*.htm
// @match        https://mingde.bit.edu.cn/*.htm
// @match        https://xuteli.bit.edu.cn/*.htm
// @match        https://xcb.bit.edu.cn/*.htm
// @match        https://grd.bit.edu.cn/*.htm
// @match        https://sie.bit.edu.cn/*.htm
// @match        https://cs.bit.edu.cn/*.htm
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  // 优先使用在前面的 title_selector
  const matches = [
    { // 教学中心
      host: 'jxzx',
      attachments_selector: '.pageArticle > .Annex > ul > li > a'
    },
    { // 教务部
      host: 'jwb',
      attachments_selector: '.Annex > ul > li > a'
    },
    { // World Wide Web
      host: 'www',
      attachments_selector: '.article .Annex > ul > li > a'
    },
    { // Student
      host: 'student',
      attachments_selector: '.fujian > ul  > li > a'
    },
    { // Optics
      host: 'opt',
      attachments_selector: '.fujian > ul > li > a'
    },
    { // 明德
      host: 'mingde',
      attachments_selector: '.pageArticle .Annex > ul > li > a'
    },
    { // 徐特立
      host: 'xuteli',
      attachments_selector: '.annex > ul > li > a'
    },
    { // 宣传部
      host: 'xcb',
      attachments_selector: '.rt_fujian > ul > li > a'
    },
    { // Graduate
      host: 'grd',
      attachments_selector: '.myfujian > ul > li > a'
    },
    { // School of Information and Electronics
      host: 'sie',
      attachments_selector: '.annexList > li > a'
    },
    { // Computer Science
      host: 'cs',
      attachments_selector: '.fujian > ul > li > a'
    }
  ]

  function set_attachments_filenames () {
    const site_host = window.location.host

    for (const s of matches) {
      if (site_host === `${s.host}.bit.edu.cn`) {
        document.querySelectorAll(s.attachments_selector).forEach(attach => {
          if (!attach.download) {
            let attach_filename = attach.textContent

            if (!/\.[0-9a-zA-Z]+$/.test(attach_filename)) {
              // textContent 不含扩展名
              attach_filename += attach.href.match(/\.[0-9a-zA-Z]+$/)
            }

            attach.download = attach_filename
          }
        })

        break
      }
    }
  }

  set_attachments_filenames()
})()
