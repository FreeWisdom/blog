const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(
        { "error": [], "extra": [], "data": { "list": [{ "article_subtitle": "", "video_time": "00:06:08", "id": 136797, "had_viewed": false, "article_title": "01 | 课程介绍", "article_cover": "", "video_media_map": { "sd": { "size": 59401420 }, "ld": { "size": 35017068 }, "hd": { "size": 107900344 } }, "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/static001.geekbang.org\/resource\/image\/cd\/07\/cd13da291b3608dbcec4790db4c2ce07.jpg", "include_audio": false, "video_size": 467254906, "video_time_arr": { "m": "06", "s": "08", "h": "00" }, "column_sku": 100036001, "video_id": "637f9da548c34b0596121f981122cd35", "article_could_preview": true, "is_required": true, "chapter_id": "906", "score": 1568790120726, "article_ctime": 1568790120 }, { "article_subtitle": "", "video_time": "00:01:58", "id": 136798, "had_viewed": false, "article_title": "02 | 内容综述", "article_cover": "", "video_media_map": { "sd": { "size": 17226816 }, "ld": { "size": 9881844 }, "hd": { "size": 29884480 } }, "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/67c56bd96d5747508d5d5e984c94fc13\/snapshots\/abce20e443aa4c6d845bf383fe42ac64-00005.jpg", "include_audio": false, "video_size": 30358230, "video_time_arr": { "m": "01", "s": "58", "h": "00" }, "column_sku": 100036001, "video_id": "67c56bd96d5747508d5d5e984c94fc13", "article_could_preview": true, "is_required": true, "chapter_id": "906", "score": 1568790180578, "article_ctime": 1568790180 }, { "article_subtitle": "", "video_time": "00:03:33", "id": 136799, "had_viewed": false, "article_title": "03 | Node.js是什么？", "article_cover": "", "video_media_map": { "sd": { "size": 13994156 }, "ld": { "size": 7885660 }, "hd": { "size": 19522484 } }, "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/c7f166e016dc4bf89e95967b65a2f447\/snapshots\/fbfe7eb2289644efbfba2931d8587ead-00005.jpg", "include_audio": false, "video_size": 91213276, "video_time_arr": { "m": "03", "s": "33", "h": "00" }, "column_sku": 100036001, "video_id": "c7f166e016dc4bf89e95967b65a2f447", "article_could_preview": true, "is_required": true, "chapter_id": "906", "score": 1568790240208, "article_ctime": 1568790240 }, { "article_subtitle": "", "video_time": "00:08:43", "id": 136800, "had_viewed": false, "article_title": "04 | Node.js可以用来做什么？", "article_cover": "", "video_media_map": { "sd": { "size": 45658244 }, "ld": { "size": 26383544 }, "hd": { "size": 66436192 } }, "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/8eeb38fe232f4a7fad8a430849079ed9\/snapshots\/d06081e6d61746799b169bd96d59f0c4-00005.jpg", "include_audio": false, "video_size": 102157917, "video_time_arr": { "m": "08", "s": "43", "h": "00" }, "column_sku": 100036001, "video_id": "8eeb38fe232f4a7fad8a430849079ed9", "article_could_preview": true, "is_required": true, "chapter_id": "906", "score": 1568790300786, "article_ctime": 1568790300 }, { "article_subtitle": "", "video_time": "00:03:33", "id": 136801, "had_viewed": false, "article_title": "05 | 课程实战项目介绍", "article_cover": "", "video_media_map": { "sd": { "size": 17641168 }, "ld": { "size": 10137900 }, "hd": { "size": 25225276 } }, "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/c09e89fbfa6544eda6e0ee01901acce2\/snapshots\/08b1896aadfd474296cddc55c138a869-00005.jpg", "include_audio": false, "video_size": 43289961, "video_time_arr": { "m": "03", "s": "33", "h": "00" }, "column_sku": 100036001, "video_id": "c09e89fbfa6544eda6e0ee01901acce2", "article_could_preview": true, "is_required": true, "chapter_id": "906", "score": 1568790360844, "article_ctime": 1568790360 }, { "article_subtitle": "", "video_time": "00:02:33", "id": 136803, "had_viewed": false, "article_title": "06 | 什么是技术预研？", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/ef45703fb28f47e79e9cb5d2ae7ad209\/snapshots\/69c1ffff2ba84dd18f9eeb0a4e5a7776-00005.jpg", "include_audio": false, "video_size": 65344127, "video_time_arr": { "m": "02", "s": "33", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1568790420783, "article_ctime": 1568790420 }, { "article_subtitle": "", "video_time": "00:06:17", "id": 136804, "had_viewed": false, "article_title": "07 | Node.js开发环境安装", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/e39671f3abf046008bfc1e9aad5e55ba\/snapshots\/939dbeb0b0124151b5fa40c84196d7c8-00005.jpg", "include_audio": false, "video_size": 96303628, "video_time_arr": { "m": "06", "s": "17", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1568790480309, "article_ctime": 1568790480 }, { "article_subtitle": "", "video_time": "00:08:55", "id": 136806, "had_viewed": false, "article_title": "08 | 第一个Node.js程序：石头剪刀布游戏", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/01132b13b69b4e5ca2b33bdbb50ab00e\/snapshots\/e134ec560c294a5d8294ba28fc0025fe-00005.jpg", "include_audio": false, "video_size": 266574059, "video_time_arr": { "m": "08", "s": "55", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1568790540055, "article_ctime": 1568790540 }, { "article_subtitle": "", "video_time": "00:17:39", "id": 136807, "had_viewed": false, "article_title": "09 | 模块：CommonJS规范", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/e9a59d6f4780451095ca486a1e99ac99\/snapshots\/7ea59f36ff644b92bc27605462e48c05-00005.jpg", "include_audio": false, "video_size": 203642850, "video_time_arr": { "m": "17", "s": "39", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1569396600508, "article_ctime": 1569396600 }, { "article_subtitle": "", "video_time": "00:06:01", "id": 136808, "had_viewed": false, "article_title": "10 | 模块：使用模块规范改造石头剪刀布游戏", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/c1834aa7432f48e294214351cf06ae5c\/snapshots\/31778dd5f63040b6980f859395504f13-00005.jpg", "include_audio": false, "video_size": 92360500, "video_time_arr": { "m": "06", "s": "01", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1569397440762, "article_ctime": 1569397440 }, { "article_subtitle": "", "video_time": "00:11:24", "id": 136809, "had_viewed": false, "article_title": "11 | 模块：npm", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/160ef55961134b088450c6852c139077\/snapshots\/dfa3738e28b94919a99741cecfef740e-00005.jpg", "include_audio": false, "video_size": 132219800, "video_time_arr": { "m": "11", "s": "24", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1569397500367, "article_ctime": 1569397500 }, { "article_subtitle": "", "video_time": "00:19:19", "id": 141994, "had_viewed": false, "article_title": "12 | 模块：Node.js内置模块", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/c3cab6d6485d441bb1fc9ab804352142\/snapshots\/faed4eff89144ae9981c4262ab56398d-00005.jpg", "include_audio": false, "video_size": 232404694, "video_time_arr": { "m": "19", "s": "19", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1569562920376, "article_ctime": 1569562920 }, { "article_subtitle": "", "video_time": "00:16:26", "id": 143517, "had_viewed": false, "article_title": "13 | 异步：非阻塞I\/O", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/73cadfb4fc464512a45c3a6dd6ab4508\/snapshots\/ef795bdf01e54f30a9d9dc364c47b575-00005.jpg", "include_audio": false, "video_size": 202416642, "video_time_arr": { "m": "16", "s": "26", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1569981600572, "article_ctime": 1569981600 }, { "article_subtitle": "", "video_time": "00:14:41", "id": 143557, "had_viewed": false, "article_title": "14 | 异步：异步编程之callback", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/66488ab036cd4b8a944f5f9a8403e702\/snapshots\/a034d4bbcbf34e9ca336e7dd77570175-00005.jpg", "include_audio": false, "video_size": 182094457, "video_time_arr": { "m": "14", "s": "41", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1569981660316, "article_ctime": 1569981660 }, { "article_subtitle": "", "video_time": "00:10:17", "id": 143564, "had_viewed": false, "article_title": "15 | 异步：事件循环", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/aff468023a724d0d8649c5a781834388\/snapshots\/bd3e3dc9b9e74ab79aadf1f4e412b60a-00005.jpg", "include_audio": false, "video_size": 132294052, "video_time_arr": { "m": "10", "s": "17", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1569981720924, "article_ctime": 1569981720 }, { "article_subtitle": "", "video_time": "00:25:12", "id": 143644, "had_viewed": false, "article_title": "16 | 异步：异步编程之Promise", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/807bd87a4b83489397eccb075a26bea2\/snapshots\/81c497741edb460494975e9c1c828020-00005.jpg", "include_audio": false, "video_size": 312514203, "video_time_arr": { "m": "25", "s": "12", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1570620300795, "article_ctime": 1570620300 }, { "article_subtitle": "", "video_time": "00:14:21", "id": 146470, "had_viewed": false, "article_title": "17 | 异步：异步编程之async\/await", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/8bedc86bf3db4b1bb855acb03bb21424\/snapshots\/3de8a1ec5bf04f19b679134f2fa2342a-00005.jpg", "include_audio": false, "video_size": 199075760, "video_time_arr": { "m": "14", "s": "21", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1570620360512, "article_ctime": 1570620360 }, { "article_subtitle": "", "video_time": "00:06:21", "id": 146569, "had_viewed": false, "article_title": "18 | HTTP：什么是HTTP服务器？", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/029b2e5a45314d0d82976d0f58d51d67\/snapshots\/fc398495d6244675b1569373622108e2-00005.jpg", "include_audio": false, "video_size": 223176797, "video_time_arr": { "m": "06", "s": "21", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1570620420887, "article_ctime": 1570620420 }, { "article_subtitle": "", "video_time": "00:07:41", "id": 146582, "had_viewed": false, "article_title": "19 | HTTP：简单实现一个HTTP服务器", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/de096bdee74149ddaecc6bd32a176222\/snapshots\/e5ed6a8c25084bf5b31f23f959d5b246-00005.jpg", "include_audio": false, "video_size": 144923147, "video_time_arr": { "m": "07", "s": "41", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1570620480079, "article_ctime": 1570620480 }, { "article_subtitle": "", "video_time": "00:10:19", "id": 151876, "had_viewed": false, "article_title": "20 | HTTP：实现网页版石头剪刀布", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/92e873ce3bb6438e8637c3e734b44a48\/snapshots\/064652ab126e4c0cbfb5ffab31d71d0f-00005.jpg", "include_audio": false, "video_size": 119614853, "video_time_arr": { "m": "10", "s": "19", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1571238180352, "article_ctime": 1571238180 }, { "article_subtitle": "", "video_time": "00:20:31", "id": 151880, "had_viewed": false, "article_title": "21 | HTTP：用express优化石头剪刀布游戏", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/44e81681034b4f14803e2cc6959d9fb5\/snapshots\/dd6cdf38bf82448780e35ad4f6ef3d6d-00005.jpg", "include_audio": false, "video_size": 237672645, "video_time_arr": { "m": "20", "s": "31", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1571238240606, "article_ctime": 1571238240 }, { "article_subtitle": "", "video_time": "00:16:37", "id": 151914, "had_viewed": false, "article_title": "22 | HTTP：用koa优化石头剪刀布游戏", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/400f678c82c44f9d97754d228d0e2a2d\/snapshots\/a9cd7155e52b4b71825b654d89db8f74-00005.jpg", "include_audio": false, "video_size": 192278192, "video_time_arr": { "m": "16", "s": "37", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1571238300923, "article_ctime": 1571238300 }, { "article_subtitle": "", "video_time": "00:11:51", "id": 151911, "had_viewed": false, "article_title": "23 | RPC 调用：什么是RPC调用？", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/aa0bebe9f4684bf19683f426c0c98bce\/snapshots\/118bc827db8b424cac47d3d18ee03d58-00005.jpg", "include_audio": false, "video_size": 136798483, "video_time_arr": { "m": "11", "s": "51", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1571238360172, "article_ctime": 1571238360 }, { "article_subtitle": "", "video_time": "00:16:29", "id": 151912, "had_viewed": false, "article_title": "24 | RPC调用：Node.js Buffer编解码二进制数据包", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/07b1c3eea5d74d8398d0c37ef3ab776f\/snapshots\/b980907c55b54ef8b185e299290cda20-00005.jpg", "include_audio": false, "video_size": 190747741, "video_time_arr": { "m": "16", "s": "29", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1571238420519, "article_ctime": 1571238420 }, { "article_subtitle": "", "video_time": "00:23:00", "id": 152724, "had_viewed": false, "article_title": "25 | RPC 调用：Node.js net建立多路复用的RPC通道", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/413d309e516b4d9d8da140d701ed78c2\/snapshots\/98c16ab7d72f47d89170a52c6c2e4803-00005.jpg", "include_audio": false, "video_size": 266144287, "video_time_arr": { "m": "23", "s": "00", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "907", "score": 1571392260043, "article_ctime": 1571392260 }, { "article_subtitle": "", "video_time": "00:12:27", "id": 155083, "had_viewed": false, "article_title": "26 | 项目启动：整体需求分析", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/c7ee9a984f304efcb28dc194a694ec3c\/snapshots\/3e68c7a674ba4cbabfbe8105a08f81c8-00005.jpg", "include_audio": false, "video_size": 144148646, "video_time_arr": { "m": "12", "s": "27", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1015", "score": 1571839080634, "article_ctime": 1571839080 }, { "article_subtitle": "", "video_time": "00:06:46", "id": 155084, "had_viewed": false, "article_title": "27 | 项目启动：极客时间App下载页开发", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/3a320e08010d416aa9503070ec6878e4\/snapshots\/2370d1fe3e144d76b2d3eddba43f73b9-00005.jpg", "include_audio": false, "video_size": 78219204, "video_time_arr": { "m": "06", "s": "46", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1015", "score": 1571839140849, "article_ctime": 1571839140 }, { "article_subtitle": "", "video_time": "00:06:15", "id": 155085, "had_viewed": false, "article_title": "28 | 课程详情页：极客时间详情页需求解构", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/58b3c104132648dfb3fc3e553a80ec47\/snapshots\/aacb4a3725024509a47db3b7062e19ce-00005.jpg", "include_audio": false, "video_size": 72514266, "video_time_arr": { "m": "06", "s": "15", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1015", "score": 1571839200216, "article_ctime": 1571839200 }, { "article_subtitle": "", "video_time": "00:11:56", "id": 155196, "had_viewed": false, "article_title": "29 | 课程详情页：将ES6模版字符串改造成模板引擎", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/38cbaafe2269429e8d8639664e4c00b9\/snapshots\/2a65c92089e94686835b85deb2e09212-00005.jpg", "include_audio": false, "video_size": 137946799, "video_time_arr": { "m": "11", "s": "56", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1015", "score": 1571888280346, "article_ctime": 1571888280 }, { "article_subtitle": "", "video_time": "00:14:09", "id": 155198, "had_viewed": false, "article_title": "30 | 课程详情页：极客时间详情页需求实现", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/9c5bb59daf7640bb997fec9209a93572\/snapshots\/5c070744ba1e4186afbe5a8fb7760067-00005.jpg", "include_audio": false, "video_size": 163924407, "video_time_arr": { "m": "14", "s": "09", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1015", "score": 1571888340006, "article_ctime": 1571888340 }, { "article_subtitle": "", "video_time": "00:06:22", "id": 158831, "had_viewed": false, "article_title": "31 | 课程播放页：极客时间播放页需求解构", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/12df367aad9c4589aba04b2fb4e1c240\/snapshots\/14ce985fdc31411da3a4c93805b8fcca-00005.jpg", "include_audio": false, "video_size": 73748572, "video_time_arr": { "m": "06", "s": "22", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1015", "score": 1572414120983, "article_ctime": 1572414120 }, { "article_subtitle": "", "video_time": "00:10:46", "id": 158832, "had_viewed": false, "article_title": "32 | 课程播放页：GraphQL API服务", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/baa40668330747c2863a96c080834388\/snapshots\/78e1c81dd89a4598b00d1fa54eac9747-00005.jpg", "include_audio": false, "video_size": 124676664, "video_time_arr": { "m": "10", "s": "46", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1015", "score": 1572414180488, "article_ctime": 1572414180 }, { "article_subtitle": "", "video_time": "00:09:47", "id": 158833, "had_viewed": false, "article_title": "33 | 课程播放页：极客时间播放页需求实现", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/e0af3fdbbb454e4bad25478f2cbdcd54\/snapshots\/5c2e779c4a664c63a6fa0d6ae894e317-00005.jpg", "include_audio": false, "video_size": 113041649, "video_time_arr": { "m": "09", "s": "47", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1015", "score": 1572414240742, "article_ctime": 1572414240 }, { "article_subtitle": "", "video_time": "00:05:32", "id": 158834, "had_viewed": false, "article_title": "34 | 课程列表页：极客时间列表页需求解构", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/1f604e2dba0a4dcf90b2e760fdbda54d\/snapshots\/3861459228344063a3d2fbe2e6881f75-00005.jpg", "include_audio": false, "video_size": 64065484, "video_time_arr": { "m": "05", "s": "32", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1015", "score": 1572414300842, "article_ctime": 1572414300 }, { "article_subtitle": "", "video_time": "00:13:18", "id": 158835, "had_viewed": false, "article_title": "35 | 课程列表页：用 Vue\/React 进行服务端渲染", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/9efd8a655afb438a8e1b16afd02662bf\/snapshots\/6a9ab19190814ddcbe3cbbba380a36d5-00005.jpg", "include_audio": false, "video_size": 154078021, "video_time_arr": { "m": "13", "s": "18", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1015", "score": 1572414360279, "article_ctime": 1572414360 }, { "article_subtitle": "", "video_time": "00:21:49", "id": 159407, "had_viewed": false, "article_title": "36 | 课程列表页：极客时间列表页需求实现", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/97dcd9984538458490a86a5d9b235bbd\/snapshots\/3833d3d7c1714707b01afb1205e8c0cf-00005.jpg", "include_audio": false, "video_size": 251426921, "video_time_arr": { "m": "21", "s": "49", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1015", "score": 1572498660245, "article_ctime": 1572498660 }, { "article_subtitle": "", "video_time": "00:11:39", "id": 162487, "had_viewed": false, "article_title": "37 | 性能工具：HTTP服务的性能测试", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/de02e9414ebc4bc6ad091ab1e4a83642\/snapshots\/629cfda50f7b4281845c623a2c44e0a7-00005.jpg", "include_audio": false, "video_size": 134702674, "video_time_arr": { "m": "11", "s": "39", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1040", "score": 1573031880091, "article_ctime": 1573031880 }, { "article_subtitle": "", "video_time": "00:11:53", "id": 162490, "had_viewed": false, "article_title": "38 | 性能工具：Node.js性能分析工具", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/6d504651ff0a43c8b2e95c36d4c49320\/snapshots\/34dff6c4d1ac45fe9b835f089153fad2-00005.jpg", "include_audio": false, "video_size": 137378693, "video_time_arr": { "m": "11", "s": "53", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1040", "score": 1573031940766, "article_ctime": 1573031940 }, { "article_subtitle": "", "video_time": "00:08:07", "id": 162491, "had_viewed": false, "article_title": "39 | 代码优化：JavaScript代码性能优化", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/caa201f749834d18815319772da3197a\/snapshots\/208b722e4c744dda887d91884286c80f-00005.jpg", "include_audio": false, "video_size": 93909373, "video_time_arr": { "m": "08", "s": "07", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1040", "score": 1573032000415, "article_ctime": 1573032000 }, { "article_subtitle": "", "video_time": "00:12:16", "id": 162497, "had_viewed": false, "article_title": "40 | 代码优化：内存管理优化", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/c6bb4892548f45bab12e5690997f696e\/snapshots\/c47bb3aee990421fabef7938f9ec6e76-00005.jpg", "include_audio": false, "video_size": 142132328, "video_time_arr": { "m": "12", "s": "16", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1040", "score": 1573032060507, "article_ctime": 1573032060 }, { "article_subtitle": "", "video_time": "00:19:07", "id": 162499, "had_viewed": false, "article_title": "41 | 代码优化：Node.js C++插件", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/dc8057942932402593daae2f76b46a6f\/snapshots\/2bc901f0f2c34c61a491ddc8a3ff5c8c-00005.jpg", "include_audio": false, "video_size": 221184867, "video_time_arr": { "m": "19", "s": "07", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1040", "score": 1573032120464, "article_ctime": 1573032120 }, { "article_subtitle": "", "video_time": "00:11:59", "id": 165460, "had_viewed": false, "article_title": "42 | 多进程优化：Node.js子进程与线程", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/3691e67d123c43a5bd55aa1a86339921\/snapshots\/b99cbd449550402781982a460514a2ee-00005.jpg", "include_audio": false, "video_size": 138497157, "video_time_arr": { "m": "11", "s": "59", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1040", "score": 1573622580022, "article_ctime": 1573622580 }, { "article_subtitle": "", "video_time": "00:18:31", "id": 165461, "had_viewed": false, "article_title": "43 | 多进程优化：Node.js cluster模块实战与源码解读", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/416373c83ce04cebb9351cb081f7885e\/snapshots\/3eefb747feb1406ab4283e9f24532a35-00005.jpg", "include_audio": false, "video_size": 213962911, "video_time_arr": { "m": "18", "s": "31", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1040", "score": 1573622640199, "article_ctime": 1573622640 }, { "article_subtitle": "", "video_time": "00:14:27", "id": 165463, "had_viewed": false, "article_title": "44 | 多进程优化：进程守护与管理", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/c69b413e4cae4193bc010be414e8833d\/snapshots\/ac3c917e6a684d98ae705b50fcb7c483-00005.jpg", "include_audio": false, "video_size": 166915181, "video_time_arr": { "m": "14", "s": "27", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1040", "score": 1573622700326, "article_ctime": 1573622700 }, { "article_subtitle": "", "video_time": "00:13:21", "id": 165465, "had_viewed": false, "article_title": "45 | 架构优化：动静分离", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/22c5097d283b4eefbacd588ddc61ebab\/snapshots\/74b507dc445a43dd92b5c833fe3df074-00005.jpg", "include_audio": false, "video_size": 154041005, "video_time_arr": { "m": "13", "s": "21", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1040", "score": 1573622760261, "article_ctime": 1573622760 }, { "article_subtitle": "", "video_time": "00:14:35", "id": 165466, "had_viewed": false, "article_title": "46 | 架构优化：反向代理与缓存服务", "article_cover": "", "video_media_map": [], "had_freelyread": false, "is_video_preview": true, "article_summary": "", "column_had_sub": false, "video_cover": "https:\/\/media001.geekbang.org\/a2f5d9efceef41f3beac456ff678a104\/snapshots\/89ce7b8540d546c7b70e3a512c5683e6-00005.jpg", "include_audio": false, "video_size": 168784004, "video_time_arr": { "m": "14", "s": "35", "h": "00" }, "column_sku": 100036001, "video_id": "", "article_could_preview": false, "is_required": true, "chapter_id": "1040", "score": 1573622820812, "article_ctime": 1573622820 }], "page": { "count": 46, "more": false } }, "code": 0 }));
}).listen(4003, () => {
    console.log('article http server listened: 4003')
});