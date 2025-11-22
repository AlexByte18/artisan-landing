const myTags = [
  '<i class="fa-brands fa-js"></i>',
  '<i class="fa-brands fa-html5"></i>',
  '<i class="fa-brands fa-css3-alt"></i>',
  '<i class="fa-brands fa-python"></i>',
  '<i class="fa-brands fa-react"></i>',
  '<i class="fa-brands fa-git-alt"></i>',
  '<i class="fa-brands fa-node"></i>',
  '<i class="fa-brands fa-docker"></i>',
  '<i class="fa-brands fa-aws"></i>',
  '<i class="fa-brands fa-java"></i>',
  '<i class="fa-brands fa-rust"></i>',
  '<i class="fa-brands fa-vuejs"></i>',
];

var tagCloud = TagCloud('.sphere', myTags, {
  radius: 250,
  maxSpeed: 'normal',
  initSpeed: 'normal',
  direction: 90,
  keep: true,
  useHTML: true,
});

setTimeout(() => {
  const items = document.querySelectorAll('.tagcloud--item');

  items.forEach(item => {
    if (item.innerText.includes('<i')) {
      item.innerHTML = item.innerText;
    }
  });
}, 500);

document.querySelector('.sphere').style.color = '#ffffff';
