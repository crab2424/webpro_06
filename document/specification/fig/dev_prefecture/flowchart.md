```mermaid
graph TD
    A[一覧ページ GET prefecture] --> |名称からリンク|B(詳細ページ<br>GET prefecture:number);
    A --> C(新規追加ページ<br>GET prefecture/new);

    C --> |追加ボタン|D{新規追加処理<br>POST prefecture};
    D --> A;

    B --> |変更ボタン|E(変更ページ<br>GET prefecture/edit/:number);
    B --> |削除ボタン|F{削除処理<br>POST prefecture/delete/:number};

    E --> |編集ボタン|G{変更処理<br>POST prefecture/update/:number};
    G --> B;
    F --> A;
```
