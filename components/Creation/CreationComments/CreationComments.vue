<docs>
	### 稿件评论
</docs>

<script setup lang="ts">
	const props = withDefaults(defineProps<{
		/** 评论数目。 */
		count?: number | string;
		comments?: Comments200ResponseInner[];
		videoId?: number;
	}>(), {
		count: 0,
		comments: () => [],
		videoId: undefined,
	});

	const downvote = ref(0), pinned = ref(false);
	const search = ref("");
</script>

<template>
	<Comp>
		<HeadingComments :count="count" />
		<TextEditorRtf :videoId="videoId" />
		<div class="toolbar">
			<div class="left">

			</div>
			<div class="right">
				<TextBox v-model="search" :placeholder="t.search" icon="search" />
				<Pagination :current="1" :pages="99" :displayPageCount="7" />
				<SoftButton icon="deletion_history" />
			</div>
		</div>
		<div class="items">
			<CreationCommentsItem
				v-for="comment in comments"
				:key="comment.id"
				v-model:upvote="comment.upvoteCount"
				v-model:downvote="downvote"
				v-model:isUpvoted="comment.userHasUpvoted"
				v-model:isDownvoted="comment.userHasDownvoted"
				v-model:pinned="pinned"
				:index="comment.id"
				:username="comment.fullname"
				:avatar="comment.profilePictureUrl"
				:date="new Date(comment.created!)"
				:upvote_score="comment.upvoteCount"
			>
				<!-- eslint-disable-next-line vue/no-v-html -->
				<div v-html="comment.content"></div>
			</CreationCommentsItem>
		</div>
	</Comp>
</template>

<style scoped lang="scss">
	:comp {
		margin-top: 2.5rem;

		header {
			margin-bottom: 16px;
		}
	}

	.toolbar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		margin-top: 16px;

		> * {
			display: flex;
			flex-wrap: wrap;
			gap: 16px;
			align-items: center;
			justify-content: flex-end;
		}

		.soft-button {
			--wrapper-size: 36px;
			--ripple-size: 48px;
		}

		.text-box {
			width: 200px;
		}
	}
</style>
