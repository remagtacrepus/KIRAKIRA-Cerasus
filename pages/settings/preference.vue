<script setup lang="ts">
	const dataSaverMode = ref("standard");
	const focusMode = reactive({
		noSearchRecommendations: false,
		noRelatedVideos: false,
		noRecentSearch: false,
		noViewHistory: false,
	});
	const openInNewWindow = ref(false);
</script>

<template>
	<Subheader icon="placeholder">流量节省程序模式</Subheader>
	<section list>
		<RadioButton v-model="dataSaverMode" v-ripple value="economical" details="不会显示图片，不会自动加载视频。">省流模式</RadioButton>
		<RadioButton v-model="dataSaverMode" v-ripple value="standard">标准模式</RadioButton>
		<RadioButton v-model="dataSaverMode" v-ripple value="consumption" details="将一次性加载大量图片，提前加载靠后几页的评论。以防网络突然中断。">极速模式</RadioButton>
	</section>
	
	<Subheader icon="placeholder">专注模式</Subheader>
	<section list>
		<Checkbox v-model:single="focusMode.noSearchRecommendations" v-ripple value="noSearchRecommendations">禁用搜索推荐</Checkbox>
		<Checkbox v-model:single="focusMode.noRelatedVideos" v-ripple value="noRelatedVideos">禁用相关视频</Checkbox>
	</section>
	
	<Subheader icon="placeholder">隐私</Subheader>
	<section list>
		<Checkbox v-model:single="focusMode.noRecentSearch" v-ripple value="noRecentSearch">停止显示搜索历史</Checkbox>
		<Checkbox v-model:single="focusMode.noViewHistory" v-ripple value="noViewHistory">停用历史记录</Checkbox>
	</section>
	
	<Subheader icon="placeholder">新窗口</Subheader>
	<section list>
		<ToggleSwitch v-model="openInNewWindow" icon="placeholder">在新窗口打开视频</ToggleSwitch>
	</section>
</template>
