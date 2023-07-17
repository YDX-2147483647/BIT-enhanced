// ==UserScript==
// @name         中国大学MOOC-测验与作业-列表
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  获取作业列表（然后什么也干不了）
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

  function main () {
    const button = document.querySelector('button.download-homework-list')

    if (window.location.hash === '#/learn/testlist') {
      if (!button) {
        add_button()
      }
    } else {
      button?.remove()
    }
  }

  Mooc.on_every_loaded(main)
  window.addEventListener('hashchange', () => Mooc.on_every_loaded(main))

  /**
   * 获取作业章节列表（作为元素）
   * @returns {HTMLElement[]}
   */
  function get_chapter_elements () {
    return document.querySelectorAll('#courseLearn-inner-box .u-learn-moduletitle + div > .m-chapterQuizHwItem')
  }
  /**
   * 获取作业章节列表
   * @returns {object[]}
   */
  function get_chapters () {
    return Array.from(get_chapter_elements()).map(parse_chapter)
  }

  /**
   *
   * @param original {string}
   * @returns
   */
  function parse_deadline (original) {
    return new Date(original.replace(/截止时间：?/, ''))
  }
  /**
   * @param {string} hint 某项作业中跳转按钮的文本
   * @returns {string|null} 类型，null 表示未知
   */
  function parse_redirect_hint (hint) {
    if (hint === '前往测验') {
      return '测验'
    } else if (hint === '前往作业') {
      return '互评'
    } else {
      return null
    }
  }

  /**
   * 解析某一项作业
   * @param quiz {HTMLElement}
   */
  function parse_quiz (quiz) {
    const title = quiz.querySelector('h4').textContent
    const deadline_original_text = quiz.querySelector('.j-submitTime').textContent
    const redirect_hint = quiz.querySelector('.j-quizBtn').textContent
    return {
      title,
      deadline: parse_deadline(deadline_original_text),
      type: parse_redirect_hint(redirect_hint)
    }
  }

  /**
   * 解析作业章节
   * @param chapter {HTMLElement}
   */
  function parse_chapter (chapter) {
    const title = chapter.querySelector('h3').textContent
    const quizzes = chapter.querySelectorAll('.u-quizHwListItem')
    return {
      title,
      quizzes: Array.from(quizzes).map(parse_quiz)
    }
  }

  /**
   * 在标题栏添加测试按钮
   */
  function add_button () {
    const header = document.querySelector('#g-body > div.m-learnhead > div')

    const button = document.createElement('button')
    button.type = 'button'
    button.classList.add('download-homework-list')
    button.innerText = '下载作业列表'
    button.style.padding = '0.5em .2em'
    button.addEventListener('click', () => {
      const blob = new Blob(
        [JSON.stringify(get_chapters(), undefined, 2)],
        { type: 'application/json' })
      save_file(blob, '作业列表')
    })

    header.appendChild(button)
  }
  /**
   * 下载文件
   * @param {Blob} blob
   * @param {string} file_name
   */
  function save_file (blob, file_name) {
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.download = file_name
    anchor.href = url

    anchor.click()

    URL.revokeObjectURL(url)
  }
})()
