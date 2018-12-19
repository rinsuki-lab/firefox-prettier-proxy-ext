// https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/filterResponseData

declare namespace chrome.webRequest {
    export type StreamFilterStatus = "uninitialized" | "transferringdata" | "finishedtransferringdata" | "suspended" | "closed" | "disconnected" | "failed"

    export interface StreamFilter {
        close()
        disconnect()
        resume()
        suspend()
        write(data: Uint8Array | ArrayBuffer)

        ondata(event: {data: ArrayBuffer})
        onerror()
        onstart()
        onstop()
        error?: string

        status: StreamFilterStatus
    }

    function filterResponseData(requestId: string): StreamFilter
}