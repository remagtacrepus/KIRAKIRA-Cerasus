// 注意：当任意一门语言文件的字符串声明缺少或多余其它语言文件时都会报错，因此请务必及时为所有语言文件补齐字符串声明。

const SChinese = {
	colon: "：",
	semicolon: "；",
	welcome: "欢迎",
	home: "首页",
	anime: "动画",
	music: "音乐",
	otomad: "音MAD",
	content: "内容",
	search: "搜索",
	button: "按钮",
	button_disabled: "按钮被禁用",
	button_clicked: "我被单击了 呜呜呜~",
	confetti: "五彩纸屑",
	send: "发送",
	show_alert: "显示警告框",
	toggle_switch: "切换开关",
	on: "开",
	off: "关",
	disabled: "禁用",
	background: "背景",
	animated_background: "动态背景",
	settings: "设置",
	light: "浅色主题",
	dark: "深色主题",
	system: "跟随系统",
	pink: "萌妹粉",
	sky: "天空蓝",
	blue: "智乃蓝",
	green: "千夜绿",
	orange: "心爱橙",
	purple: "理世紫",
	custom: "自定义",
	checkbox: "复选框",
	search_settings: "搜索设置",
	appearance: "外观",
	theme: "主题",
	palette: "个性色",
	language: "语言",
	tag: "标签",
	all: "全部",
	video: "视频",
	images: "图片",
	logo_hidden: "LOGO隐藏",
	logo_half: "LOGO半显示",
	logo_show: "LOGO全显示",
	comments: "评论",
	uploaders_lovin_it: "UP主爱啦",
	finish: "操作成功完成",
	you_know_too_much: "你知道的太多了。",
	dashboard: "数据",
	account: "账号",
	profile: "资料",
	traces: "印迹",
	privacy: "隐私",
	security: "安全",
	login_options: "登录选项",
	password: "密码",
	account_linking: "关联社交平台",
	blocklist: "黑名单",
	player: "播放",
	danmaku: "弹幕",
	preference: "偏好",
	accessibility: "无障碍",
	about: "关于",
	technology: "科技",
	game: "游戏",
	synthetical: "综合",
	user_settings: "用户设置",
	app_settings: "应用设置",
	nickname: "昵称",
	nickname_requirements: "1~20个字符，仅可包含大小写拉丁字母、数字、常用平/片假名、汉字、特殊符号 ｢-｣ ｢_｣",
	gender: "性别",
	male: "男",
	female: "女",
	transgender: "中",
	birthday: "生日",
	email: "电子邮件",
	email_address: "电子邮箱",
	authenticator: "身份验证器",
	current_email: "当前邮箱",
	modification_date: "修改日期",
	addition_date: "添加日期",
	modify: "修改",
	save: "保存",
	add: "添加",
	apply: "应用",
	reset: "重设",
	history: "历史",
	favorite: "收藏",
	upload: "投稿",
	messages: "消息",
	login: "登入",
	logout: "登出",
	signature: "个性签名",
	close: "关闭",
} as const;

export default SChinese;
export type LocaleWithDefaultValue = typeof SChinese;
export type LocaleIdentifiers = Record<keyof typeof SChinese, string>;
