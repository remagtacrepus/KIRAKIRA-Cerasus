/*
 * 参考：Vue 中如何获取插槽的 DOM 对象
 * @see https://free_pan.gitee.io/freepan-blog/articles/05-vue3/vue3-杂项/vue中如何获取插槽的dom对象.html
 */

type SlotNode = ComponentPublicInstance & { vnode: VNode[] };
type CallFun = (slotNode: SlotNode) => void;
interface RenderCallbackObj {
	/**
	 * 自定义 mounted 回调。
	 */
	mounted?: CallFun;
	/**
	 * 自定义 updated 回调。
	 */
	updated?: CallFun;
	/**
	 * 自定义 unmounted 回调。
	 */
	unmounted?: CallFun;
}
export const useCustomFactory = ({ mounted, updated, unmounted }: RenderCallbackObj) => {
	return defineComponent({
		props: {
			vnode: {
				type: Array as PropType<VNode[]>,
				default: undefined,
			},
		},
		mounted() {
			// 这个 this.$el 就代表当前 vnode 的 DOM 对象。
			mounted?.(this);
		},
		updated() {
			updated?.(this);
		},
		unmounted() {
			unmounted?.(this);
		},
		render(props: { vnode: VNode[] }) {
			return props.vnode;
		},
	});
};
const findChildren = (vnodes: VNode[], type: unknown) => {
	const children = [] as VNode[];
	for (const child of vnodes)
		if (child.type === type) children.push(child);
		else if (child.children instanceof Array) children.push(...findChildren(child.children as VNode[], type));
	return children;
};
/**
 * 渲染插槽节点。
 * @remarks 如果直接使用，目前有 bug，其 props 不能构成响应式。
 * @param type - 子组件类型筛选。
 * @param slotName - 插槽名称。留空表示 default 插槽。
 * @returns 插槽组件，和子节点引用。
 */
export const useFactory = (type: unknown = undefined, slotName: string | (() => VNode[]) = "default") => {
	const instance = getCurrentInstance();
	const scopeId = getScopeIdFromInstance(instance);
	const slotNode = ref<SlotNode>();
	const children = ref<VNode[]>([]);
	const RenderComp = useCustomFactory({
		mounted: e => {
			slotNode.value = e;
			if (type) children.value = findChildren(e.vnode, type);
		},
		unmounted: _e => {
			slotNode.value = undefined;
			children.value = [];
		},
	});
	const slot = typeof slotName === "string" ? useSlots()[slotName] : slotName;
	const addSlotScopeId = (s: ReturnType<Exclude<typeof slot, undefined>>) => {
		if (scopeId) // 无论父组件是否有 `:slotted`，都一律无脑加上？
			s.forEach(i => {
				i.props ??= {};
				i.props[scopeId + "-s"] = "";
			});
		return s;
	};
	const _Slot = slot ? h(RenderComp, { vnode: addSlotScopeId(slot()) }) : undefined;
	const Slot = (_Slot as Partial<typeof _Slot>)!;
	return { RenderComp, Slot, children, slotNode };
};
