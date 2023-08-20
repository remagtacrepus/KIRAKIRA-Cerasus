import { I18nArgsFunction, LocaleWithDefaultValue } from "locales/types";

// 如果需要 <i18n> 块内语言字符串：useI18n({ useScope: "local" })
/** 获取本地化字符串对象。 */
export const t = new Proxy({}, {
	get(_target, rootName) {
		if (rootName === "__v_isRef" || typeof rootName === "symbol") return; // Vuex 干的好事。
		const getParentsPrefix = (...prefixes: string[]) => prefixes.length ? prefixes.join(".") : "";
		const i18n = useNuxtApp().$i18n;
		const getDeclarationInfo = (...keys: string[]) => {
			const key = getParentsPrefix(...keys);
			const raw = i18n.tm(key) as string | object;
			return {
				isNamespace: typeof raw === "object" && !!Object.keys(raw).length,
				includesInterpolation: typeof raw === "string" && raw.includes("{"),
				missing: typeof raw === "object" && !Object.keys(raw).length,
				missingDefault: typeof raw === "object" && !("_" in raw),
				key,
				raw,
			};
		};
		const getMissingKey = (key: string, getAFunction: boolean = true) => {
			const displayValue = `<${key}>`;
			if (!getAFunction) return displayValue;
			const missingKey = () => missingKey;
			missingKey.toString = () => displayValue;
			return missingKey;
		};
		const translate = (keys: string[], list: Readable[] = []) => {
			const { isNamespace, missingDefault } = getDeclarationInfo(...keys);
			if (missingDefault) return getMissingKey(getParentsPrefix(...keys), false);
			const key = !isNamespace ? getParentsPrefix(...keys) : getParentsPrefix(...keys, "_");
			return i18n.t(key, typeof list[0] === "object" ? list[0] : list, {
				fallbackWarn: false,
				missingWarn: false,
			});
		};
		const getWithArgsFunction = (...prefixes: string[]) =>
			(...args: Readable[]) =>
				translate(prefixes, typeof args[0] === "object" ? args[0] : args);
		const getWithArgsProxy = (...parents: string[]) => {
			const keys = [rootName, ...parents];
			const info = getDeclarationInfo(...keys);
			if (info.missing)
				return getMissingKey(info.key);
			else if (!info.includesInterpolation && !info.isNamespace)
				return translate(keys);
			else return new Proxy(getWithArgsFunction(...keys), {
				get(_target, currentName): unknown {
					if (currentName === Symbol.toPrimitive)
						return () => translate(keys);
					if (typeof currentName === "string")
						return getWithArgsProxy(...parents, currentName);
				},
			});
		};
		return getWithArgsProxy();
	},
}) as LocaleWithDefaultValue & Readonly<Record<string, string & I18nArgsFunction>>;
Object.freeze(t);

/**
 * 获取当前语言名称。
 * @returns 当前语言名称。
 */
export function getCurrentLocale() {
	return (useNuxtApp().$i18n.locale as unknown as ComputedRef<string>).value;
}
