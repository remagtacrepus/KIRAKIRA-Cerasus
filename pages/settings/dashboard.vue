<script setup lang="ts">
	const avatar = "/static/images/avatars/aira.webp";
	const registerDate = ref(new Date());
	const registerDateDisplay = computed(() => formatDate(registerDate.value, "yyyy/MM/dd"));
	const uid = ref<bigint>(2n);
</script>

<template>
	<div class="user-profile" @click="navigate('/settings/profile')">
		<div v-ripple class="avatar">
			<img :src="avatar" alt="avatar" draggable="false" />
		</div>
		<div class="text">
			<div class="username">艾了个拉</div>
			<div class="bio">Kind and Kawaii, Forever! </div>
		</div>
	</div>

	<div class="user-counts chip">
		<div>
			<span class="value">233</span>
			<p>{{ t.follow }}</p>
		</div>
		<div>
			<span class="value">233</span>
			<p>{{ t.fans }}</p>
		</div>
		<div>
			<span class="value">233</span>
			<p>{{ t.watched }}</p>
		</div>
		<div>
			<span class="value">233</span>
			<p>{{ t.rating }}</p>
		</div>
	</div>

	<div class="user-info chip">
		<SettingsChipItem icon="birthday" :details="registerDateDisplay">{{ t.user.birthday }}</SettingsChipItem>
		<SettingsChipItem icon="history" :details="registerDateDisplay">{{ t.user.join_time }}</SettingsChipItem>
		<SettingsChipItem icon="fingerprint" :details="uid">UID</SettingsChipItem>
	</div>
</template>

<style scoped lang="scss">
	.user-profile {
		display: flex;
		gap: 15px;
		cursor: pointer;

		&:any-hover .avatar > img {
			scale: 125%;
		}

		&:not(:any-hover) .avatar > img {
			transition-duration: 1s;
		}

		.avatar {
			@include square(64px);
			@include circle;
			overflow: hidden;
			background-color: c(gray-20);

			> img {
				z-index: 1;
				width: 100%;
				object-fit: cover;
				aspect-ratio: 1 / 1;
			}
		}

		.text {
			display: flex;
			flex-direction: column;
			gap: 6px;
			justify-content: center;

			.username {
				font-weight: bold;
				font-size: 24px;
			}

			.bio {
				color: c(icon-color);
			}
		}
	}

	.user-counts {
		display: flex;
		justify-content: space-around;
		padding: 14px 0;

		> div {
			@include flex-center;
			flex-direction: column;
			width: 25%;

			span {
				font-weight: bold;
				font-size: 24px;
			}

			p {
				color: c(icon-color);
			}
		}
	}
</style>
