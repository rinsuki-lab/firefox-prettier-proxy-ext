// @ts-check

/*** @type {any} */
var prettier, prettierPlugins

// 申し訳程度のキャッシュ
var cache = {}

chrome.webRequest.onHeadersReceived.addListener(details => {
    const header = details.responseHeaders.find(h => h.name.toLowerCase() == "content-type")
    if (header == null) {
        console.log("content-type header not found", details.responseHeaders)
        return
    }
    if (!header.value.includes("javascript")) {
        console.log("not js", header.value)
        return
    }
    const id = details.requestId
    const filter = chrome.webRequest.filterResponseData(id)
    var arr = new Uint8Array(0)
    filter.ondata = e => {
        console.log(e)
        const recvChunk = new Uint8Array(e.data)
        var newarr = new Uint8Array(arr.length + recvChunk.length)
        newarr.set(arr)
        newarr.set(recvChunk, arr.length)
        console.log(arr.length, recvChunk.length, newarr.length)
        arr = newarr
    }
    filter.onstop = () => {
        var decoded = (new TextDecoder().decode(arr))
        if (!(/* JSON判定 */decoded.startsWith("{"))) {
            const prettiered = cache[decoded] || prettier.format(decoded, {
                semi: false,
                parser: prettierPlugins.babylon.parsers.babylon.parse
            })
            if (cache[decoded] == null) cache[decoded] = prettiered
            decoded = prettiered
        }
        const encoded = new TextEncoder().encode(decoded)
        filter.write(encoded)
        filter.close()
    }
}, {
    urls: ["<all_urls>"]
}, ["blocking", "responseHeaders"])