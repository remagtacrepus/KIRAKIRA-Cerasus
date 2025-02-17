<script setup lang="ts">
	import testBackground from "assets/images/test-background.png";

	const props = withDefaults(defineProps<{
		/**
		 * 最终视频链接。
		 * @deprecated 目前仅在开发环境中使用，生产环境应该换成 kv 编号。
		 */
		link?: string;
		/** 视频编号 KVID。 */
		videoId?: number;
		/** 图片链接。 */
		image?: string;
		/** 视频上传日期。 */
		date?: Date;
		/** 视频播放量。 */
		watchedCount?: number;
		/** 创作者名称。 */
		uploader: string;
		/** 创作者编号 UID。 */
		uploaderId: number;
		/** 视频时长。 */
		duration?: Duration;
		/** 在新窗口打开视频？ */
		blank?: boolean;
	}>(), {
		link: "#",
		videoId: undefined,
		image: testBackground,
		date: undefined,
		watchedCount: 0,
		uploaderId: undefined,
		duration: undefined,
	});

	const date = computed(() => props.date ? formatDate(props.date, "yyyy/MM/dd") : "----/--/--");
	const watchedCount = computed(() => getCompactDecimal(props.watchedCount));
	const duration = computed(() => props.duration ?? "--:--");
	const link = computed(() => props.videoId !== undefined && props.videoId !== null ?
		`/video/kv${props.videoId}` : props.link);
</script>

<template>
	<LocaleLink class="thumb-video lite" :to="link" :blank="blank">
		<div class="card">
			<div class="cover-wrapper">
				<img :src="image" alt="cover" class="cover" />
			</div>
			<div class="text-wrapper">
				<div class="title"><slot>视频标题</slot></div>
				<div class="info">
					<div class="line">
						<div class="item">
							<Icon name="play" />
							<p>{{ watchedCount }}</p>
						</div>
						<div class="item">
							<Icon name="time" />
							<p>{{ duration }}</p>
						</div>
					</div>
					<div class="line">
						<LocaleLink class="item uploader" :to="`/user/${uploaderId ?? ''}`" linkInLink :blank="blank">
							<Icon name="person" />
							<div>{{ uploader }}</div>
						</LocaleLink>
						<div class="item">
							<Icon name="calendar" />
							<div>{{ date }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</LocaleLink>
</template>

<style scoped lang="scss">
	@layer props {
		a:comp {
			/// 视图，可选的值为: grid | tile | list。
			--view: grid;
		}
	}

	a:comp {
		@include round-large;
		position: relative;
		display: inline-block;
		color: c(text-color);

		&:any-hover:not(:active) {
			z-index: 1;

			.card {
				@include system-card;
				translate: 0 -6px;
				background-color: c(surface-color);
				backdrop-filter: none; // WARN: WTF Chromium? Again? https://bugs.chromium.org/p/chromium/issues/detail?id=1422867
			}
		}

		&:focus-visible {
			@include large-shadow-focus;
		}

		&:active {
			@include button-scale-pressed;
		}

		@container style(--view: list) {
			width: 100%;
		}
	}

	.card {
		@include round-large;
		padding: 8px 9px;

		@container style(--view: tile) {
			display: flex;
			gap: 8px;
			align-items: center;
		}

		@container style(--view: list) {
			display: flex;
			gap: 16px;
			align-items: center;
		}
	}

	.cover-wrapper {
		@include round-large;
		flex-shrink: 0;
		margin-bottom: 8px;
		overflow: hidden;
		aspect-ratio: 16 / 9;

		img.cover {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		@container style(--view: list) or style(--view: tile) {
			width: 135px;
			margin-bottom: 0;
		}
	}

	.text-wrapper {
		overflow: hidden;

		@container style(--view: list) {
			width: 100%;
		}
	}

	.title {
		overflow: hidden;
		font-weight: 500;
		white-space: nowrap;
		text-align: justify;
		text-overflow: ellipsis;

		&:lang(zh),
		&:lang(ja) {
			text-overflow: "⋯⋯";
		}

		@supports (display: -webkit-box) { // 只有 -webkit-box 才能支持多行省略号
			$title-line-height: 22px;
			// stylelint-disable-next-line value-no-vendor-prefix
			display: -webkit-box;
			height: $title-line-height * 2;
			line-height: $title-line-height;
			white-space: normal;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 4px;
		justify-content: space-between;
		margin: 6px 0 0 -2px;
		color: c(icon-color);
		font-size: 12px;

		.line {
			display: flex;
			gap: 8px;
			justify-content: space-between;

			@container style(--view: list) {
				flex-direction: column;
			}
		}

		.item {
			@include flex-center;
			flex-shrink: 0;
			gap: 2px;
			justify-content: flex-start;

			.icon {
				font-size: 16px;
			}
		}

		.uploader {
			justify-content: flex-start;
			color: inherit;
			text-decoration: none;

			> div {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
</style>
