# HTMLモック - 資格対策アプリ

このフォルダには、資格対策アプリの各ページのHTMLモックファイルが含まれています。

## ファイル一覧

1. **index.html** - トップページ
   - アプリケーションのランディングページ
   - 機能概要とナビゲーションリンク

2. **genre_selection.html** - ジャンル選択ページ
   - 学習ジャンルの選択画面
   - Python、インフラ、その他のカテゴリー別表示

3. **quiz_list.html** - 問題一覧ページ
   - 問題の一覧表示
   - ジャンルフィルター、回答状況フィルター、キーワード検索機能

4. **quiz_question.html** - 問題表示ページ
   - 個別の問題表示と回答
   - 選択肢の表示、解答ボタン、解説表示機能

5. **quiz_statistics.html** - 学習統計ページ
   - 学習進捗の統計表示
   - 未回答、回答済み、完了の状態別集計
   - グラフ表示機能（Chart.js使用）

6. **quiz_result.html** - 結果表示ページ
   - 回答結果の表示
   - 正解・不正解の判定と解説

7. **header.html** - ヘッダー/サイドバーナビゲーション
   - サイドバー型ナビゲーションのモック
   - 全ページで使用される共通コンポーネント

## 使用方法

### ブラウザで直接開く

各HTMLファイルはスタンドアロンで動作するため、ブラウザで直接開いて確認できます：

```bash
# Macの場合
open html_mock/index.html

# Linuxの場合
xdg-open html_mock/index.html

# Windowsの場合
start html_mock/index.html
```

### ローカルサーバーで確認

より本番に近い環境で確認したい場合は、ローカルサーバーを起動してください：

```bash
# Pythonの簡易サーバーを使用
cd html_mock
python3 -m http.server 8000

# ブラウザで http://localhost:8000 にアクセス
```

## 特徴

- **レスポンシブデザイン**: モバイルとデスクトップの両方に対応
- **インタラクティブ**: JavaScript による動的な動作を含む
- **スタンドアロン**: 各ファイルは独立して動作
- **実データのモック**: サンプルデータを含み、実際の動作を確認可能

## デザイン要素

- **カラースキーム**: 
  - プライマリ: #667eea (紫青)
  - セカンダリ: #764ba2 (紫)
  - グラデーション背景
  
- **フォント**: 
  - システムフォント (Apple System, Roboto, Segoe UI など)
  
- **アニメーション**: 
  - ホバーエフェクト
  - トランジション
  - フェードイン/アウト

## 注意事項

- これらはモックファイルであり、バックエンドとの連携はありません
- 実際のDjangoアプリケーションとは独立して動作します
- リンクは同じフォルダ内の他のモックファイルを参照しています

## 開発者向け情報

このモックは、以下のDjangoテンプレートから作成されました：

- `/templates/core/index.html`
- `/templates/core/genre_selection.html`
- `/templates/core/quiz_list.html`
- `/templates/core/quiz_question.html`
- `/templates/core/quiz_statistics.html`
- `/templates/core/quiz_result.html`
- `/templates/core/header.html`

実装時には、これらのモックを参考にDjangoテンプレートとの整合性を確認してください。
