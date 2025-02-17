<script setup lang="tsx">
	import k1bod from "assets/audios/K1B0D.ogg";

	const sfx = ref<HTMLAudioElement>();
	const playSfx = () => {
		if (!sfx.value) return;
		sfx.value.currentTime = 0;
		sfx.value.play();
	};
	const Kbd = ((_, { slots }) => <kbd onClick={playSfx}>{slots.default?.()}</kbd>) as VueJsx;
	
	type Platform = "Windows" | "macOS" | "Linux";
	
	const platform = computed<Platform | undefined>(() => {
		if (environment.server) return;
		const { platform } = navigator;
		if (/(Mac|iPhone|iPod|iPad)/i.test(platform)) return "macOS";
		else if (/(Linux)/i.test(platform)) return "Linux";
		else if (/(Win)/i.test(platform)) return "Windows";
	});
	
	const Ctrl = computed(() => platform.value === "macOS" ? "Cmd" : platform.value === "Linux" ? "Control" : "Ctrl");
</script>

<template>
	<Subheader icon="keyboard">{{ t.guide }}</Subheader>
	<audio ref="sfx" :src="k1bod"></audio>
	<div class="table">
		<!-- #region 播放页 -->
		<h3>{{ t.shortcut_key.player_page }}</h3>

		<p>{{ t.shortcut_key.play_pause }}</p>
		<p><Kbd>Space</Kbd></p>

		<p>{{ t.shortcut_key.exit_fullscreen }}</p>
		<p><Kbd>Esc</Kbd></p>
		<!-- #endregion -->

		<!-- #region 分页器 -->
		<h3>{{ t.shortcut_key.pagination }}</h3>

		<p>{{ t.shortcut_key.page_turning }}</p>
		<p><Kbd>←</Kbd> <Kbd>→</Kbd></p>
		<!-- #endregion -->

		<!-- #region 评论区 -->
		<h3>{{ t.shortcut_key.comment_area }}</h3>

		<p>{{ t.format.bold }}</p>
		<p><Kbd>{{ Ctrl }}</Kbd> + <Kbd>B</Kbd></p>

		<p>{{ t.format.italic }}</p>
		<p><Kbd>{{ Ctrl }}</Kbd> + <Kbd>I</Kbd></p>

		<p>{{ t.format.underline }}</p>
		<p><Kbd>{{ Ctrl }}</Kbd> + <Kbd>U</Kbd></p>

		<p>{{ t.format.strikethrough }}</p>
		<p><Kbd>{{ Ctrl }}</Kbd> + <Kbd>Shift</Kbd> + <Kbd>X</Kbd></p>

		<p>{{ t.shortcut_key.quick_insert_kaomoji }}</p>
		<p><Kbd>{{ Ctrl }}</Kbd> + <Kbd>M</Kbd></p>

		<p>{{ t.send }}</p>
		<p><Kbd>{{ Ctrl }}</Kbd> + <Kbd>Enter</Kbd></p>
		<!-- #endregion -->
	</div>
</template>

<style scoped lang="scss">
	h3 {
		color: c(accent);
	}

	.table {
		display: grid;
		grid-template-columns: repeat(2, auto);
		gap: 8px;
		align-items: center;

		h3 {
			grid-column-end: span 2;
			margin: 0.35rem 0 0.25rem;

			&:first-of-type {
				margin-top: 0;
			}
		}
	}
</style>
