# firefox-prettier-proxy-ext

## これはなに

読み込むJavaScriptをprettierに通すFirefoxのブラウザ拡張です。
`manifest.json`のpermissionsに対象を追加して`about:debugging`からロードさせてください。

## なんかめっちゃロード遅いんですけど

初めて知ったJSはブラウザ上で動くprettierで変換するので重いです。二回目以降は変換内容をキャッシュしますが、background.jsの変数が飛ぶとキャッシュも飛びます。

## なんで作ったの

Firefox Devtoolsのパフォーマンスプロファイラがunminifyしたあとの行に飛べなかったから...