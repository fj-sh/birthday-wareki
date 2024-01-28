
## 友達一覧

- SwipeToDelete のカードを作る
- [x] ヘッダーのデザインをもっとシンプルにして、1月, 2月... というようにする
- 友達保存するときにmonth と dayを整形する
- maestro で e2e を動かしてみる

## 設定画面

- 通知を Chip の一覧で作成する
- タグの編集と削除、追加ができるようにする
- 他のアプリへの DeepLink をつける（一度リリースしたあとでよい）

## E2E

```shell
npx expo start --clear --tunnel
maestro test ./e2e/sample.yml
```

## ビルド

```shell
eas build:configure
eas build -p ios
eas submit
eas submit -p ios --latest --profile production
```
