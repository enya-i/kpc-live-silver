# 选手肖像与卡片精细化

使用内置 Image Gen 对九张原站卡面逐张重绘，去除金色卡框、旗帜、文字和装饰，统一石墨背景与自然肤色。要求尽量保留原人物外貌、服装和姿态；属于 AI 重绘设计素材，并非新增实拍。原始 JPG 保留，供核对与替换。

成品：`public/assets/players/portrait-{1,2,3,4,5,6,7,9,10}.webp`。输入对应同目录 `{编号}.jpg`。仅使用 Sharp 缩放与 WebP 格式转换。

桌面首页约展示四张并露出下一张，卡片宽度约为原来的六成；全部选手页使用四列，小屏使用两列。详情可查看重绘大图。

## 逐张编辑统一提示词

Edit this provided official player card into a restrained premium editorial portrait for a silver-and-graphite poker website. Preserve the exact identity of this person: same face, age, facial proportions, hairstyle, glasses if any, expression, skin tone, clothing and body pose. Do not beautify or invent a different face. Remove ALL card graphics: gold borders, brand logos, flags, lettering, ornamental metallic patterns, decorative spikes, name text. Replace background with plain deep graphite gray (#15191d), soft natural studio-like side light with a subtle cool rim on shoulder, authentic skin texture and original clothing texture. Portrait crop from head to mid torso, face in upper third; keep full head with small breathing room, centered composition, vertical 4:5 portrait. Recover any clothing beneath removed graphics naturally. High-end believable editorial photograph, understated natural color, gentle contrast, no grayscale skin, no CGI skin, no gold, no text, no logos, no frame, no jewelry additions. This is an identity-preserving background/graphic cleanup, not a new person.
