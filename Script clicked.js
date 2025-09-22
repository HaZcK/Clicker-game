var score = 0;
var scoreDiv = document.getElementById('score');
var btn = document.getElementById('clickBtn');

btn.onclick = function(e) {
  score++;
  scoreDiv.textContent = 'Score: ' + score;
  createParticles(e);
};

function createParticles(e) {
  var btnRect = btn.getBoundingClientRect();
  var centerX = btnRect.left + btnRect.width / 2;
  var centerY = btnRect.top + btnRect.height / 2;

  for (var i = 0; i < 12; i++) {
    var particle = document.createElement('div');
    particle.className = 'particle ' + (i % 2 === 0 ? 'blue' : 'red');
    document.body.appendChild(particle);

    var angle = Math.random() * Math.PI * 2;
    var distance = 40 + Math.random() * 30;
    var x = centerX + Math.cos(angle) * distance;
    var y = centerY + Math.sin(angle) * distance;

    particle.style.left = (centerX - 8) + 'px';
    particle.style.top = (centerY - 8) + 'px';

    animateParticle(particle, x, y);
  }
}

function animateParticle(particle, targetX, targetY) {
  var startX = parseFloat(particle.style.left);
  var startY = parseFloat(particle.style.top);
  var endY = targetY + 80 + Math.random() * 40;
  var duration = 700 + Math.random() * 400;
  var start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = (timestamp - start) / duration;
    if (progress > 1) progress = 1;

    var currentX = startX + (targetX - startX) * progress;
    var currentY = startY + (endY - startY) * progress;

    particle.style.left = currentX + 'px';
    particle.style.top = currentY + 'px';
    particle.style.opacity = 1 - progress;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      particle.remove();
    }
  }
  requestAnimationFrame(step);
}
