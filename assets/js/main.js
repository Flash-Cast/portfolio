// assets/js/main.js

// ページの読み込み完了後に関数を実行
window.addEventListener('load', function() {
  
  // 1. 待機画面を非表示にする
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
  }

  // 2. 本文をフェードインさせる
  document.body.classList.add('loaded');

  // 3. AOS（スクロールアニメーション）を初期化する
  // AOSライブラリが読み込まれていれば、AOSは未定義ではない
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800, // アニメーションの時間（ミリ秒）
      once: true,    // アニメーションを1回だけ実行
      offset: 100,   // アニメーションが始まるトリガー位置（px）
    });
  }
});


// --- モーダルウィンドウの処理 ---
// まず、モーダル本体がこのページに存在するかどうかを確認する
const modal = document.getElementById('modal');

// もしmodalが存在する場合（つまり、Worksページ）だけ、中の処理を実行する
if (modal) {
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalLink = document.getElementById('modal-link');
  const closeButton = document.querySelector('.close-button');
  const openButtons = document.querySelectorAll('.open-modal');

  // 各カードのボタンにイベント追加
  openButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.work-card');

      modalImg.src = card.dataset.img;
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
      modalLink.href = card.dataset.link;

      modal.classList.remove('hidden');
      modal.style.display = 'flex'; // hiddenクラスを消した後、displayをflexに戻す
      setTimeout(() => modal.classList.add('show'), 10); // 少し遅らせてshowクラスを追加し、CSSトランジションを発動
    });
  });

  // 閉じる処理
  const closeModal = () => {
    modal.classList.remove('show');
    // transitionが終わるのを待ってからdisplay: noneにする
    modal.addEventListener('transitionend', () => {
      modal.style.display = 'none';
    }, { once: true }); // イベントリスナーを一度だけ実行
  };

  closeButton.addEventListener('click', closeModal);

  // 背景クリックで閉じる
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}


// --- My Strengths セクションの自己PR展開 ---
// このコードはモーダルとは無関係なので、if文の外に置く
document.querySelectorAll('.strength-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});

//study.html
// --- Study Page (Accordion) ---
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    // クリックされたヘッダーに 'active' クラスを付け外し
    header.classList.toggle('active');

    // 対応するパネルを取得
    const panel = header.nextElementSibling;

    // パネルが開いているか確認
    if (panel.style.maxHeight) {
      // 開いていれば閉じる
      panel.style.maxHeight = null;
    } else {
      // 閉じていれば、コンテンツの高さ分だけ開く
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});