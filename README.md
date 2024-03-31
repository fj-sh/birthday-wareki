
## 友達一覧

- カードタップをカード全体に適用する
- 設定画面に他のアプリへのリンクをつける（記念日と年齢擬態）
- もっとスクロールしやすいように余白をつくる

## 設定画面

- 通知を Chip の一覧で作成する
- タグの編集と削除、追加ができるようにする
- 他のアプリへの DeepLink をつける（一度リリースしたあとでよい）

## Run

```shell
npx expo start --clear --tunnel
npx expo start --dev-client --tunnel --clear
```

## ビルド

```shell
eas build:configure
eas build -p ios
eas submit
eas submit -p ios --latest --profile production
```

## Development Build

```shell
eas build --profile development --platform ios
eas build --profile development-simulator --platform ios --local
```

## Directory Structure

```txt
src/
├─ app/ # アプリケーション全体のルーティング/レイアウト
├─ pages/ # 各画面に対応する Component
├─ features/ # 機能に依存するComponentやHook。機能ごとにフォルダを作成
  ├─ feature1/
    ├─ components/
    ├─ hooks/
    ├─ functions/
    ├─ types/
  ├─ i18n/
├─ components/ # 機能に依存しないComponent
├─ hooks/ # 機能に依存しないHook
├─ functions/ # 機能に依存しない関数
├─ types/ # 機能に依存しない型定義
├─ styles/ # アプリケーション全体で利用するスタイル
├─ configs/ # 外部ライブラリの設定や環境変数
├─ stores/ # グローバルな状態管理
```