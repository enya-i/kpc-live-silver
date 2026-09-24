# 官方选手阵容核对

2026-09-21 从 https://kpclive.com/zh 读取首页，核对其加载脚本 `/_next/static/chunks/0p1glf0~1zm0i.js` 中的 players 数组。

当前官方顺序为 6、2、9、4、7、3、10、5、1，共 9 位，不是 PRD 记录的 10 张。原站 `/images/home/player-card/8.jpg` 返回 404，未将错误页面或虚构人物加入阵容。

姓名均按官方卡面文字录入，不依据面孔推断。原站仅给出卡面，未补写未经核实的履历、头衔或战绩。

| 编号 | 卡面姓名 |
| --- | --- |
| 6 | ELTON TSANG |
| 2 | XUAN TAN |
| 9 | ST WANG |
| 4 | AARON ZANG |
| 7 | XIAOYU |
| 3 | CHARLES |
| 10 | DING XIANG ONG |
| 5 | YE WANG |
| 1 | WIKTOR MALINOWSKI |

原图路径：`https://kpclive.com/images/home/player-card/{编号}.jpg`，本地对应 `public/assets/players/{编号}.jpg`。保留原图设计及色彩，不裁切卡面姓名。此前三位冠军的报道继续用于资讯，新闻来源已与选手数组解耦。
