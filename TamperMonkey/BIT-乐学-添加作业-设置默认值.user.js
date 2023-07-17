// ==UserScript==
// @name         BIT-乐学-添加作业-设置默认值
// @namespace    http://tampermonkey.net/
// @version      0.3.0
// @description  适用于教师和高级助教。
// @license      GPL-3.0-or-later
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        https://lexue.bit.edu.cn/course/modedit.php*
// @grant        none
// ==/UserScript==

// 请修改下面的`defaults`。只支持部分设置

(function () {
  'use strict'

  class LeXue {
    /**
     * 获取`keyword`对应的元素
     * @param {string} keyword
     * @returns
     */
    static _get_input (keyword) {
      return document.querySelector(`#id_${keyword}`)
    }

    /**
     * 设置日期
     * @param {'allowsubmissionsfromdate'|'duedate'|'gradingduedate'} keyword
     * @param {Date} date
     */
    static due (keyword, date) {
      LeXue._get_input(`${keyword}_day`).selectedIndex = date.getDate() - 1
      LeXue._get_input(`${keyword}_month`).selectedIndex = date.getMonth()
      LeXue._get_input(`${keyword}_year`).selectedIndex = date.getFullYear() - 1900

      LeXue._get_input(`${keyword}_hour`).selectedIndex = date.getHours()
      LeXue._get_input(`${keyword}_minute`).selectedIndex = date.getMinutes()
    }

    /**
     * 设置`<select>`、`<option>`型
     * @param {string} keyword
     * @param {string} option `<option>`的`value`
     */
    static select (keyword, option) {
      const select_el = LeXue._get_input(keyword)
      const options = Array.from(select_el.children)
      options.find(o => o.textContent === option || o.value === option).selected = true
    }

    /**
     * 设置`<input type='checkbox'>`型
     * @param {string} keyword
     * @param {Boolean} is_checked
     */
    static check (keyword, is_checked) {
      LeXue._get_input(keyword).checked = is_checked
    }

    /**
     * 设置`<input type='text'>`型
     * @param {string} keyword
     * @param {*} value
     */
    static fill (keyword, value) {
      LeXue._get_input(keyword).value = value
    }
  }

  class Settings {
    constructor (settings) {
      this.due_date = new Date(settings.due_date)
      /** @type {'200MB'|'100MB'|'50MB'|'20MB'|'10MB'|'5MB'|'2MB'|'1MB'|'500KB'|'100KB'|'50KB'|'10KB'} */
      this.file_max_size = settings.file_max_size
      /** @type {Boolean} */
      this.feedback_comments = settings.feedback_comments
      /** @type {'none'|'manual'|'untilpass'} */
      this.attempt_reopen_method = settings.attempt_reopen_method.replace(' ', '')
      /** @type {'是'|'否'} */
      this.send_late_notification = settings.send_late_notification ? '是' : '否'
      /** @type {number} */
      this.max_score = settings.max_score
    }

    update_settings () {
      // 可用性 Availability
      LeXue.due('duedate', this.due_date)
      LeXue.due('gradingduedate', this.due_date)

      // 作业类型 Submission Types
      LeXue.select('assignsubmission_file_maxsizebytes', this.file_max_size)

      // 反馈类型 Feedback Types
      LeXue.check('assignfeedback_comments_enabled', this.feedback_comments)

      // 提交设置 Submission Settings
      LeXue.select('attemptreopenmethod', this.attempt_reopen_method)

      // 通知 Notifications
      LeXue.select('sendlatenotifications', this.send_late_notification)

      // 成绩 Mod Standard Grade
      LeXue.fill('grade_modgrade_point', this.max_score)
    }
  }

  function next_two_sunday () {
    const ret = new Date()
    ret.setDate(ret.getDate() - ret.getDay()) // last Sunday
    ret.setDate(ret.getDate() + 14)
    return ret
  }

  const defaults = new Settings({
    due_date: next_two_sunday(),
    file_max_size: '10KB',
    feedback_comments: true,
    attempt_reopen_method: 'until pass',
    send_late_notification: true,
    max_score: 10
  })

  /**
   *
   * @param {number} time ms
   * @see https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/%E5%BC%82%E6%AD%A5/Async_await
   */
  function sleep (time) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve('Wake up!')
      }, time)
    })
  };

  /**
   * 检查当前添加的是否是作业
   * @returns {Boolean}
   */
  function if_type_is_assign () {
    const params = new URLSearchParams(window.location.search)
    return params.get('add') === 'assign'
  }

  /**
   * 展开全部
   */
  function expand_all_section () {
    const expand_button = document.querySelector('.collapseexpand:not(collapse-all)')
    expand_button.click()
  }

  async function main () {
    await sleep(1000) // 等待 Moodle / yui 加载完

    // 不展开也行
    expand_all_section()

    defaults.update_settings()
  }

  if (if_type_is_assign()) {
    main()
  }
})()
