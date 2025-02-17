/**
 * 将 URL 地址转换为 blob 对象。
 * @deprecated XMLHttpRequest 这种上古技术还有用的必要吗？
 * @param url - 链接。
 * @param callback - 回调函数。
 */
export function urlToBlob_legacy(url: string, callback: (blob: Blob) => void) {
	const xhr = new XMLHttpRequest();
	xhr.open("get", url, true);
	xhr.responseType = "blob";
	xhr.onload = function () {
		if (this.status === 200 && callback)
			callback(this.response);
	};
	xhr.send();
}

/**
 * 获取不带扩展名的文件名。
 * @deprecated 已弃用，请使用改写的 path-browserify 库的同名函数。
 * @param filePath - 文件名或文件路径。
 * @returns 纯文件名。
 */
export function filenameWithoutExtension(filePath: string) {
	return path.parse(filePath).name;
}

/**
 * 文件转 Blob: 链接。
 * @param file - 文件。
 * @returns Blob: 链接。
 */
export function fileToBlob(file: File) {
	const blob = URL.createObjectURL(file);
	return blob;
}

/**
 * 文件转 Data: Base64 链接。
 * @param file - 文件。
 * @returns Data: Base64 链接。
 */
export function fileToData(file: File) {
	return new Promise<string>(resolve => {
		const fileReader = new FileReader();
		fileReader.onload = function () { resolve(this.result as string); };
		fileReader.readAsDataURL(file);
	});
}
