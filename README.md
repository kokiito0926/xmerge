## xmlmerger

xmlmergerは、複数のXMLのファイルをマージすることができるコマンドラインのツールです。  
とりわけ、同じタグを持つような要素が複数ある場合、それらを配列として連結して保持するため、設定ファイルなどの統合に最適です。

## インストール

```bash
$ npm install --global @kokiito0926/xmlmerger
```

## 使用方法

複数のXMLのファイルを指定してから、コマンドを実行します。

```bash
$ xmlmerger ./original.xml ./source.xml > combined.xml
```

## ライセンス

[MIT](LICENSE)
