// ==UserScript==
// @name         BIT-物理实验中心-实验选修
// @namespace    http://tampermonkey.net/
// @version      1.1.2
// @description  上色
// @supportURL   https://github.com/YDX-2147483647/BIT-enhanced/issues
// @author       Y.D.X.
// @match        http://10.133.22.200:7100/XPK/StuCourseElective
// @grant        none
// ==/UserScript==

// 一般选课是在“物理实验中心-（侧边栏）教学选排课-我的课程-课程选修-已选课程列表”左键单击“实验选修，这时对话框尺寸会很难受。
// 若右键单击后选择“在新标签页中打开链接”（或直接 Ctrl+左键单击），则会舒服一些。

// 单击对话框标题“实验选修”以上色。红：满；黄：冲突；绿：可选。

// 初次使用时请修改 my_conflict_referee() 中的 bans，或者整个儿修改 my_conflict_referee()。

(function () {
  'use strict'

  /**
   * 判定是否冲突
   * @param {Course} course
   * @returns {boolean}
   */
  function my_conflict_referee (course) {
    if (course.class_time.week >= 8 && course.class_time.week <= 11 &&
      course.class_time.day === 3 && course.class_time.section === 5) {
      return true
    }

    /**
     * 不能上的时间
     * @type {number[][]} [[星期几（1-7）, 第几大节（1-5）]]
     */
    const bans = [
      [1, 2], [1, 4],
      [2, 2], [2, 3], [2, 4], [2, 5],
      [3, 2], [3, 3],
      [4, 1], [4, 2], [4, 3],
      [5, 2]
    ]

    return bans.find(([day, section]) =>
      day === course.class_time.day && section === course.class_time.section)
  }

  /**
   * 课程类别，用于 CSS class
   */
  const Categories = {
    full: 'full-course',
    conflict: 'conflict-course',
    available: 'available-course'
  }

  function add_style_sheet () {
    const sheet = document.createElement('style')
    sheet.innerHTML = `
        tr.${Categories.full} {
            background-color: #FF000040;
        }

        tr.${Categories.conflict} {
            background-color: yellow;
        }

        .datagrid-view1 tr.${Categories.conflict}.${Categories.full} {
            background-color: #FF000040;
        }
        .datagrid-view2 tr.${Categories.conflict}.${Categories.full} {
            background: linear-gradient(to left, yellow, 20%, #FF000040);
        }

        tr.${Categories.available} {
            background-color: greenyellow;
        }
        `
    document.head.appendChild(sheet)
  }

  /**
   * 等待元素出现
   * @param {string} selector 元素的 CSS 选择器
   * @param {number} interval 单位为 ms
   * @returns {Promise<HTMLElement>}
   */
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

  /**
   * 解析汉字数字
   * @description 只支持一位数
   * @param {string} s
   * @returns {number}
   */
  function parse_int_zh (s) {
    return '零一二三四五六七八九'.indexOf(s)
  }
  /**
   * 解析时间
   * @param {string} time
   * @returns {number[]}
   */
  function parse_time (time) {
    return time.split(':').map(x => Number(x))
  }

  /**
   * 选课表格的一行
   * @description 因为选课表格设计得太奇怪了：分明只有一个表格，实际却是四个`<table>`……
   */
  class Course {
    /**
     * 解析形如“2/3”的比例
     * @param {string} ratio
     * @returns {number[]}
     */
    static parse_ratio (ratio) {
      return ratio.split('/').map(x => Number(x))
    }

    /**
     * 解析上课时间
     * @param {string} time 例如“第8周星期一上午第二大节2021-10-11 09:55-12:10”
     */
    static parse_class_time (time) {
      const match_obj = time.match(
        /第(?<week>\d+)周星期(?<day>[一二三四五六日])(上午|下午|晚上)第(?<section>[一二三四五])大节(?<date>[-\d]{10}) (?<start>[:\d]{5})-(?<end>[:\d]{5})/)
      if (!match_obj) {
        throw Error(`无法识别上课时间：${time}。`)
      }
      const groups = match_obj.groups

      return {
        week: Number(groups.week),
        day: '一二三四五六日'.indexOf(groups.day) + 1,
        section: parse_int_zh(groups.section),
        date: new Date(groups.date),
        start: parse_time(groups.start),
        end: parse_time(groups.end)
      }
    }

    /**
     *
     * @param {HTMLElement} left view1 中的半行
     * @param {HTMLElement} right view2 中的另外半行
     */
    constructor (left, right) {
      /** 实际元素
       * @type {HTMLElement[]} */
      this._row = [left, right]

      /** 已选人数
       * @type number */
      this.student_count = 0
      /** 课程容量
       * @type number */
      this.capacity = 0;
      [this.student_count, this.capacity] = Course.parse_ratio(this._row[1]
        .querySelector("td[field='ElectivedNum']").textContent)

      /** 上课时间
       * @type {{
          week: number, day: number, section: number, date: Date, start: number[], end: number[]
      }} */
      this.class_time = Course.parse_class_time(this._row[1]
        .querySelector("td[field='GradeValue'], td[field='value1']").textContent)
    }

    /**
     * 设置类别
     * @param {string[]} categories
     */
    _set_category (...categories) {
      this._row.forEach(side => {
        side.classList.add(...categories)
      })
    }

    /**
     * 去除类别（恢复默认）
     */
    _remove_category () {
      this._row.forEach(side => {
        side.classList.remove(...Object.values(Categories))
      })
    }

    /**
     * 根据内容更新类别
     * @param {(course: Course) => boolean} conflict_referee 判定是否冲突
     */
    update_category (conflict_referee = () => false) {
      this._remove_category()

      const is_full = this.student_count >= this.capacity
      const is_conflict = conflict_referee(this)

      if (is_full) {
        this._set_category(Categories.full)
      }
      if (is_conflict) {
        this._set_category(Categories.conflict)
      }
      if (!is_full && !is_conflict) {
        this._set_category(Categories.available)
      }
    }
  };

  /**
   * 获取课程列表
   * @returns {Course[]}
   */
  function get_courses () {
    const [left_side, right_side] = [1, 2]
      .map(n => `#tt .datagrid-view${n} .datagrid-body tbody tr`)
      .map(selector => Array.from(document.querySelectorAll(selector)))

    return left_side.map((left, index) => new Course(left, right_side[index]))
  }

  function paint () {
    const courses = get_courses()
    courses.forEach(c => c.update_category(my_conflict_referee))
  }

  /**
   * @param {HTMLElement} panel_title
   */
  function add_painter (panel_title) {
    // 单击“查询”后不会立即出结果……
    // selector: ".icon-search"
    // search_button.addEventListener('click', paint);

    panel_title.addEventListener('click', paint)
  }

  async function add_painter_caller () {
    // 是的，网页里的确是“lable”而非“label”
    const button = await wait_until_presence('.panel.datagrid .datagrid-view2 .datagrid-body table lable:first-child')
    button.addEventListener('click', () => {
      wait_until_presence('.panel-title', 1000).then(add_painter)
    })
  }

  add_style_sheet()
  add_painter_caller()
})()
