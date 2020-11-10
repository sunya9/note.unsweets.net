# コンセプト

- markdown以上に余計なことをしない
  - frontmatterとかも書くの面倒なのでやらない
    - タグは検索があれば良い
      - 検索まだないけど…
        - vercelのfunctionsでやる予定
    - 作成日時と更新日時はgitから取ってくる
      - 指定ファイルのコミットリストの最初と最後を見るだけで良い

## vercel上でgit logを全部取得する

gitなんだから雑に`git log`すれば取れるのでは？と思ったがキャッシュしてるのか直近数件しか取れずに困ってた。

ビルドコマンドを`rm -rf .git && git clone https://github.com/sunya9/note.unsweets.net.git temp && cp -r temp/.git ./ && yarn build`という超絶乱暴なものにして無理やり解決。shallow cloneしてるから`git fetch --unshallow`とかすればいいんじゃないのとか思ったけどうまくいかなかったので新たにリポジトリを取得するという荒業に出た。コミット数が多くなったときにcloneが長くなってスケールしなくなりそうな雰囲気があるが、そこまでこれを続けている自信がない。

## nodejsで作成日時と更新日時を取得する

上記のgitのcommitを利用する。特定のファイルの更新日時群を得るには`git log --format=%cd --date=iso <file path>`が使える。

```ts
import { promisify } from "util";
import { exec } from "child_process";

const execPromise = promisify(exec);
const commitDateList = await execPromise(`git log --format=%cd --date=iso <file path>`)
  .then(({ stdout }) => stdout.trim().split("\n"));
```

シンプルにgitの子プロセス立ち上げてlogコマンド発行するだけ。コマンドの出力結果は改行コードごとに区切ればよいが、最後の行に空行が入るためtrimが必要。

---

ファイルの変更履歴はファイルシステム由来のものでも良かったが、gitの変更に残らないものも更新日時としてカウントされそうなのと、ファイルシステム由来だとCD時のcloneの日付になるんじゃとか思ってやらなかった。ちゃんと調べてないけど。

