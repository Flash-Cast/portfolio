
console.log("JS読み込まれた！");
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
  AOS.init({
    duration: 800, // アニメーションの時間（ミリ秒）
    once: true,    // アニメーションを1回だけ実行
    offset: 100,   // アニメーションが始まるトリガー位置（px）
  });

});

const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // 画面に表示されたらクラスを追加して監視解除
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);  // 一度だけアニメさせたいならこれ
    }
  });
}, {
  threshold: 0.1
});

// 各要素を監視
fadeEls.forEach(el => {
  observer.observe(el);

  // 画面内にすでにいる場合にもすぐ表示
  if (el.getBoundingClientRect().top < window.innerHeight) {
    el.classList.add('show');
  }
});



const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLink = document.getElementById('modal-link');
const closeButton = document.querySelector('.close-button');

// 各カードのボタンにイベント追加
const openButtons = document.querySelectorAll('.open-modal');
openButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.work-card');

    modalImg.src = card.dataset.img;
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modalLink.href = card.dataset.link;

    modal.classList.add('show');
    modal.classList.remove('hidden');
  });
});

// 閉じる処理
closeButton.addEventListener('click', () => {
  modal.classList.remove('show');
  modal.classList.add('hidden');
});

// 背景クリックで閉じる
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    modal.classList.add('hidden');
  }
});


// strengths セクションの自己PR展開
document.querySelectorAll('.strength-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});
