//学習中
'use strict';//  ←宣言後の記述ミスをエラーとして表示してくれる機能を呼び出すための記述です。
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
  * 指定した要素の子どもを全て削除する
  * @param {HTMLElement} element HTMLの要素
  */
function removeAllChildren(element){
  while(element.firstChild){
    element.removeChild(element.firstChild);
  }
}
userNameInput.onkeydown = (event)=>{
  if(event.key === 'Enter'){
    assessmentButton.onclick();
  }
}

assessmentButton.onclick = ()=>{
  const userName = userNameInput.value;
  if(userName.length === 0){
    return;//直ちに関数の処理を終了するガード句
  }
  console.log(userName);
  // 診断結果表示エリアの作成

/*
  while(resultDivided.firstChild){// 子どもの要素があるかぎり削除  [あるかないかで分岐できる]
    　　//while 文は、与えられた論理式が true である場合に実行し続ける制御文です。
    resultDivided.removeChild(resultDivided.firstChild);
    　　//removeChild は指定された子要素を削除する関数です。
    　　//この処理は、診断結果表示エリアに、最初の子どもの要素が存在する限り、
    　　//その最初の子どもの要素を削除し続けるという処理です。 つまりは、子どもの要素を全削除する、という動作になります。
  }
*/
  removeAllChildren(resultDivided);//上のをまとめた
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
                + encodeURIComponent('あなたのいいところ')
                + '&ref_src=twsrc%5Etfw';

  anchor.setAttribute('href',hrefValue);
  anchor.className ='twitter-hashtag-button';
  anchor.setAttribute('data-text',result);
  anchor.innerText ='Tweet #あなたのいいところ';
  tweetDivided.appendChild(anchor);

  const script = document.createElement('script');
  script.setAttribute('src','https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);

};

const answers =[   //varと違い　1度しか代入できない変数である const（コンスト） という宣言
    　　　　　　　//基本的にconst　か　let　を使うようにしていく
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**      [/**]←  **2つで  JSDoc　だよて意味, どんな流れか読みやすく 誰かのコードを見るときに探してみよう
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前   //string は数値じゃなくて文字列が入りますよー　てだけ
 * @return {string} 診断結果
 */
/*
            Tips　JSDoc とインタフェース
ここで扱ったように、関数の内部の処理と、 外部から受ける出力や入力を定義している内外の境界を表す定義のことを インタフェース と呼びます。

JSDoc の記述方法は、 DevDocs というサイトで使い方が解説されていますが、 Google などで「JSDoc 書き方」などと検索すると日本語の解説サイトも沢山あるので、参考にしてみてください。

あくまでコメントですので、書かなくてもプログラムは動作しますが、 このような形式でインタフェースが定義されていると、プログラムがとても読みやすいものになります。

*************　↓入力が同じ名前なら同じ診断結果を出力する処理↓　　*************
一文字ずつ　コード番号に変換して　合計して　回答の数で割った　あまりをだす　今回は　％16
*/
function assessment(userName){
    let sumOfCharCode = 0;                                    //山 田 太 郎 　例えば４文字
    for(let i = 0;i < userName.length; i++){                  //0  1  2  3番の文字コードを合算したい  
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);//.charCodeAt()で文字のコードを出せる
    }
    // 文字のコード番号の合計を 回答の数で割って 添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    //{userName} をユーザーの名前に置き換える                 
    result = result.replace(/\{userName\}/g, userName); // 「 \ 」は「｛｝」が文字列ですよーと教えるために入れる
                            //グローバルな検索と置換を動作させるためには、正規表現に g フラグを含める必要があります。
    return result;
}

// テストコード　　console.assert()  関数が正しく動いているかをテストするために用いる
console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );
//console.assert関数の第一引数には、正しい時にtrueとなるテストしたい式を記入し、 
//第二引数には、テストの結果が正しくなかった時に出したいメッセージを記述して利用します。 正しければコンソールに何も出ない
