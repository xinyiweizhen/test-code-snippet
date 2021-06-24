function parser(src) {
    const match = src.match(/data:(image\/.*?);base64,(.+)/);
    debugger
    if (match) {
        const [, mime, byte] = match;
        return { src, mime, byte };
    }
    return false;
}

function base64ToBlob(item) {
    const bstr = atob(item.byte);
    debugger
    let n = bstr.length;
    const intArray = new Uint8Array(bstr.length);
    while (n--) {
        intArray[n] = bstr.charCodeAt(n);
    }
    return new Blob([intArray], { type: item.mime });
}
