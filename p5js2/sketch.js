const sketch = (p) => {

  let color1, color2, color3, color4;
  let posicióV, wPetal, hPetal;

  p.setup = () => {
    const canvas = p.createCanvas(400, 400);
    canvas.parent("sketch-container");
    
    color1 = p.color(p.random(200, 250), p.random(200, 240), p.random(200, 240));
    color2 = p.color(p.random(150, 100), p.random(100, 130), p.random(100, 150));
    color3 = p.color(p.random(200, 240), p.random(200, 220), p.random(200, 250));
    color4 = p.color(p.random(150, 100), p.random(110, 150), p.random(150, 140));
  };

  p.draw = () => {
    p.background(0);
    patro(50);
  };

  function patro(diametre) {
    for (let i = -p.width; i < p.width; i = i + diametre) {
      for (let d = -p.width; d < p.height; d = d + diametre) {
        if (i < p.width / 2) {
          objecteP1(i + diametre / 2, d + diametre / 2, diametre);
        } else {
          objecteP2(i + diametre / 2, d + diametre / 2, diametre);
        }
      }
    }
  }

  function objecteP1(x, y, t) {
    posicióV = t / 5;
    wPetal = t / 5;
    hPetal = t / 4;

    p.noFill();
    p.stroke(color1);
    p.strokeWeight(1.5);
    p.circle(x, y, t);
    p.quad(
      x + t / 3, y + t / 2,
      x + t / 2, y + t / 2.5,
      x + t / 1.5, y + t / 2,
      x + t / 2, y + t / 1.5
    );
    p.noStroke();
    p.fill(color2);
    p.ellipse(x + posicióV, y, hPetal, wPetal);
    p.ellipse(x - posicióV, y, hPetal, wPetal);
    p.ellipse(x, y + posicióV, wPetal, hPetal);
    p.ellipse(x, y - posicióV, wPetal, hPetal);
    p.fill(color1);
    p.circle(x, y, hPetal);
  }

  function objecteP2(x, y, t) {
    posicióV = t / 5;
    wPetal = t / 5;
    hPetal = t / 4;

    p.rectMode(p.CENTER);
    p.noFill();
    p.strokeWeight(1.5);
    p.stroke(color3);
    p.circle(x, y, t);
    p.quad(
      x + t / 3, y + t / 2,
      x + t / 2, y + t / 3,
      x + t / 1.5, y + t / 2,
      x + t / 2, y + t / 1.5
    );
    p.noStroke();
    p.fill(color4);
    p.rect(x + posicióV, y, hPetal, wPetal);
    p.rect(x - posicióV, y, hPetal, wPetal);
    p.rect(x, y + posicióV, wPetal, hPetal);
    p.rect(x, y - posicióV, wPetal, hPetal);
    p.fill(color3);
    p.square(x, y, wPetal);
  }
};

new p5(sketch);
  