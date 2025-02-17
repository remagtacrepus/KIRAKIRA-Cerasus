<script setup lang="ts">
	import kaomojis from "helpers/kaomojis";

	const emits = defineEmits<{
		insert: [text: string];
	}>();

	const model = defineModel<FlyoutModel>();
	const RECENT_ID = "recent";
	const selected = ref<keyof typeof kaomojis | typeof RECENT_ID>("happy");
	const tabs = computed(() => Object.keys(kaomojis));
	const transitionName = ref("right");
	const recentKaomoji = useRecentKaomojiStore();
	const kaomojiList = computed(() => selected.value === RECENT_ID ? recentKaomoji.kaomojis : kaomojis[selected.value]);
	const placement = ref<Placement>();

	/**
	 * 插入颜文字回调函数。
	 * @param kaomoji - 输入的颜文字。
	 */
	function input(kaomoji: string) {
		emits("insert", kaomoji);
		recentKaomoji.add(kaomoji);
	}
</script>

<template>
	<Flyout v-model="model" noPadding @beforeShow="p => placement = p">
		<Comp :class="[placement]">
			<TabBar v-model="selected" @movingForTransition="name => transitionName = name">
				<TabItem :id="RECENT_ID" icon="history" />
				<TabItem v-for="tab in tabs" :id="tab" :key="tab">{{ t.kaomoji[tab] }}</TabItem>
			</TabBar>
			<div>
				<Transition :name="transitionName" mode="out-in">
					<div :key="selected" class="grid">
						<FlyoutKaomojiButton v-for="i in kaomojiList" :key="i" @click="input(i)">{{ i }}</FlyoutKaomojiButton>
					</div>
				</Transition>
			</div>
		</Comp>
	</Flyout>
</template>

<style scoped lang="scss">
	$padding: 0.75rem 1rem;
	$width: 400px;
	$height: 350px;

	:comp {
		width: $width;
		overflow: hidden;
	}

	.tab-bar {
		padding: $padding;
		padding-bottom: 1rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 6px;
		align-content: flex-start;
		height: $height;
		padding: $padding;
		padding-top: 0.25rem;
		overflow-y: auto;
	}

	// stylelint-disable-next-line order/order
	@include float-in-children($selector: ":comp$placement", $length: 2);
</style>
