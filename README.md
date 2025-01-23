## 概要
PRの作成の際に、画像の表の整形を簡単にする外部Google拡張機能です。

## 導入方法
本プロジェクトをダウンロードし、拡張機能を管理->パッケージ化されていない拡張機能を読み込む　から本プロジェクトのルートのフォルダを選択してください。

## 使い方
画像を次のような形式で、githubのPRのテキストエリアにアップロードします。

- テーブルにしたい画像群全てを%%のペアでくくる
- 次の行に行きたい場合は改行を空ける
- 同じ行にしたい画像同士は改行を空けない
- 1行あたりの画像数はすべて同じにする
- 画像形式はMarkDown、imgタグの混同はOK

画像配置例
```
%%
<img width="456" src="xxxxxxxxxxxxx">
![image_description](yyyyyyyyyyyyy)

<img width="456" src="xxxxxxxxxxxxx">
![image_description](yyyyyyyyyyyyy)

<img width="456" src="xxxxxxxxxxxxx">
![image_description](yyyyyyyyyyyyy)
%%
```

そして、以下のように任意のwidth(or 空欄でもOK)を入力して、format imagesを押してください。
<img width="500" alt="スクリーンショット 2025-01-23 13 06 11" src="https://github.com/user-attachments/assets/0c22c0f3-ce3d-4fd9-b485-150ce8bbd4f4" />

- 使用例１

|フォーマット前|フォーマット後|
|-|-|
|<img width="500" alt="スクリーンショット 2025-01-23 12 37 01" src="https://github.com/user-attachments/assets/a65ddeee-b19b-4b83-9949-71b504e69742" />|<img width="500" alt="スクリーンショット 2025-01-23 12 38 05" src="https://github.com/user-attachments/assets/4d4d1e9e-cf0d-4256-9731-e8add83ce9aa" />|

- 使用例２

|フォーマット前|フォーマット後|
|-|-|
|<img width="500" alt="スクリーンショット 2025-01-23 12 37 53" src="https://github.com/user-attachments/assets/bd1c8a27-25b9-4e60-b20a-2d96f95cca02" />|<img width="500" alt="スクリーンショット 2025-01-23 12 37 39" src="https://github.com/user-attachments/assets/01fcf4be-2322-4278-87da-6357a003f0eb" />|
