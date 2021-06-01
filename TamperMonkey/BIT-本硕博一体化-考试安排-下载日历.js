// ==UserScript==
// @name         BIT-本硕博一体化-考试安排-下载日历
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  生成未完成考试的 iCalendar 文件并下载
// @author       Y.D.X.
// @match        http://jxzxehallapp.bit.edu.cn/jwapp/sys/studentWdksapApp/*default/index.do
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // interval's unit: ms.
    function wait_until_presence(selector, interval) {
        return new Promise((resolve, reject) => {
            let check = setInterval(function () {
                if (document.querySelector(selector)) {
                    clearInterval(check);
                    resolve(document.querySelector(selector));
                }
            }, interval);
        });
    }


    function pad(number) {
        if (number < 10)
            return '0' + number;
        return number;
    }
    function iCal_time_format(date) {
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString#description
        return date.getFullYear() +
            pad(date.getMonth() + 1) +
            pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            pad(date.getMinutes()) +
            pad(date.getSeconds());
    }
    function iCal_UTC_time_format(date) {
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString#description
        return date.getUTCFullYear() +
            pad(date.getUTCMonth() + 1) +
            pad(date.getUTCDate()) +
            'T' + pad(date.getUTCHours()) +
            pad(date.getUTCMinutes()) +
            pad(date.getUTCSeconds()) +
            'Z';
    }
    function filename_date_format(date) {
        return date.getFullYear() +
            pad(date.getMonth() + 1) +
            pad(date.getDate());
    }



    function trim_course_name(name) {
        // 这是从 python 改过来的
        name = name.replace(/\s/g, "")
        name = name.replace(/.+\//, "") // "体育/"
        name = name.replace(/[A-E]/, "")
        name = name.replace(/[Ⅰ-Ⅻ]/, match => match.codePointAt() - "Ⅰ".codePointAt() + 1)
        name = name.replace(/I{1,3}/, match => match.length)
        name = name.replace(/[(（].+[)）]/, "")
        return name
    }
    function trim_place_name(name) {
        // 这是从 python 改过来的
        if (name == "良乡工程训练中心")
            return "工训楼"

        name = name.replace(/^([综理])教楼/, "$1教")
        name = name.replace("良乡", "")
        name = name.replace(/^(文[一二三四])楼/, "$1")
        name = name.replace(/^文教([南北])楼/, "文$1")
        name = name.replace(/[一二三四五六七]层([0-9])/, "$1")
        name = name.replace(/教?室$/, "")
        return name
    }

    function get_detail(card_view) {
        const select = selector => card_view.querySelector(selector).textContent;

        let event = {};
        event["summary"] = "期末考试：" + trim_course_name(select("h3"));
        event["location"] = trim_place_name(select(".bh-mt-16 >  div:nth-child(2) span"));

        const time_range_str = card_view.querySelector(
            ".bh-mt-16 >  div:nth-child(1) > div:first-child > span"
        ).childNodes[1].textContent,
            time_range_groups = time_range_str.match(
                /^(?<date>\d{4}-\d{2}-\d{2}) (?<start_time>\d{2}:\d{2})-(?<end_time>\d{2}:\d{2})\(星期.\)$/
            ).groups;

        event["start"] = new Date(time_range_groups["date"] + " " + time_range_groups["start_time"]);
        event["end"] = new Date(time_range_groups["date"] + " " + time_range_groups["end_time"]);

        return event;
    }

    let _count_iCal = 0;
    function detail_to_iCal_event(detail) {
        let uid = `${(new Date()).toISOString()}-${pad(_count_iCal)}@ydx`;
        _count_iCal++;

        return `BEGIN:VEVENT
            SUMMARY:${detail['summary']}
            DTSTART;VALUE=DATE-TIME:${iCal_time_format(detail['start'])}
            DTEND;VALUE=DATE-TIME:${iCal_time_format(detail['end'])}
            DTSTAMP;VALUE=DATE-TIME:${iCal_UTC_time_format(new Date())}
            UID:${uid}
            LOCATION:${detail['location']}
            END:VEVENT
            `.replace(/\s{4,}/gm, "\n");
    }

    function generate_iCal() {
        let cal = `BEGIN:VCALENDAR
            VERSION:2.0
            PRODID:-//YDX//BIT iCalendar//
            `.replace(/\s{4,}/gm, "\n");
        document.querySelectorAll(tests_to_take).forEach(c => {
            cal += detail_to_iCal_event(get_detail(c));
        });
        cal += "END:VCALENDAR\n";

        return cal;
    }


    function create_download_btn() {
        const btn = document.createElement('a');
        let blob = new Blob([generate_iCal()], { type: "text/calendar" });
        btn.innerText = "🡇下载";
        btn.download = `考试安排-${filename_date_format(new Date())}.ics`;
        btn.href = URL.createObjectURL(blob);

        document.querySelector(tests_to_take_btn).children[1].children[0].appendChild(btn);
    }

    const tests_to_take_btn = "#wdksap-wkks-btn", // 我的考试安排-未考考试-button
        tests_to_take = tests_to_take_btn + " ~ .wdksap-wkks-content .scenes-cbrt-card-view";

    wait_until_presence(tests_to_take_btn, 1000).then(create_download_btn);

})();
