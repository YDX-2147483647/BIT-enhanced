// ==UserScript==
// @name         中国大学MOOC-测验与作业-互评
// @namespace    http://tampermonkey.net/
// @version      1.1.1
// @description  将所有空项设为满分，显示图片附件
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

  function fill_full_mark () {
    document.querySelectorAll('.j-homework-box .j-list .u-questionItem .u-point .s').forEach(
      (label_list) => {
        // 中国大学 MOOC 会默认选零分
        if (label_list.querySelector('label:first-child > input').checked) {
          label_list.querySelector('label:last-child > input').checked = true
        }
      }
    )
    document.querySelectorAll('.j-homework-box .j-list .u-questionItem .comment textarea').forEach(
      (textarea) => {
        if (textarea.textLength === 0) {
          textarea.value = '无误。'
        }
      }
    )
  }

  /**
   *
   * @param {string} text
   * @param {(ev: MouseEvent) => *} listener
   * @param {{css_class: str}} options
   */
  function add_button (text, listener, { css_class = 'user-created' } = {}) {
    const header = document.querySelector('#g-body > div.m-learnhead > div')

    const button = document.createElement('button')
    button.type = 'button'
    button.classList.add(css_class)
    button.innerText = text
    button.style.padding = '0.5em .2em'
    button.addEventListener('click', listener)

    header.appendChild(button)
  }

  /**
   * 在`anchor`前插入图片
   * @param {Blob} blob
   * @param {HTMLElement} anchor
   */
  function insert_img (blob, anchor) {
    const img = document.createElement('img')
    const url = URL.createObjectURL(blob)
    img.src = url
    anchor.parentElement.insertBefore(img, anchor)

    img.addEventListener('load', () => {
      URL.revokeObjectURL(url)
    })
  }

  /**
   * 给一个“下载附件”显示图片，不是图片时只标注文件扩展名。
   * @param {HTMLAnchorElement} anchor
   */
  async function fetch_one_attachment (anchor) {
    const response = await fetch(anchor.href)
    const ext = response.url.slice(response.url.lastIndexOf('.'))
    if (['.jpg', '.png', '.jpeg'].includes(ext)) {
      const blob = await response.blob()
      insert_img(blob, anchor)
    } else {
      anchor.textContent += `（${ext}）`
    }
  }

  async function fetch_all_attachments () {
    const anchors = document.querySelectorAll('a.downloadLink')
    return await Promise.all(
      Array.from(anchors).map(fetch_one_attachment)
    )
  }

  function main () {
    const existed_button = document.querySelector('button.fill-full-mark')
    if (/#\/learn\/hw\?id=\d+/.test(window.location.hash)) {
      if (!existed_button) {
        add_button('全部设为满分', fill_full_mark,
          { css_class: 'fill-full-mark' })
        add_button('下载图片附件', () => fetch_all_attachments(),
          { css_class: 'fetch-all-attachments' })
      }
    } else {
      existed_button?.remove()
      document.querySelector('button.fetch-all-attachments')?.remove()
    }
  }

  Mooc.on_every_loaded(main)
  window.addEventListener('hashchange', () => Mooc.on_every_loaded(main))
})()
