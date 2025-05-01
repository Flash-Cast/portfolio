
console.log("JS読み込まれた！");
// assets/js/main.js

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
