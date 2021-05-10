<script lang="ts">
  import Square from './Square.svelte';
  import { DeckStore } from '../stores/deckStore';
</script>

<div
  class="text-white grid grid-cols-5 grid-rows-10 gap5 justify-items-center bg-black"
  style="width: 500px"
>
  {#each DeckStore.deck.cards as s}
    <Square viewed={true} />
  {/each}
</div>
<!-- let engine = Matter.Engine.create();

let render = Matter.Render.create({
  element: document.getElementById(id),
  engine: engine,
  options: {
    width: 560,
    height: 800,
    background: '#f8f9fa',
    wireframes: false,
  },
});
Matter.Render.run(render);

let runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);

// bodies

function createPoint(x, y) {
  return Matter.Bodies.rectangle(x, y, 50, 50)
}

// interactions

let bottom = Matter.Bodies.rectangle(280, 800, 560, 20, {
  isStatic: true,
  render: {
    fillStyle: '#868e96',
  },
});
Matter.World.add(engine.world, bottom);

function wall(x, y, width, height) {
  return Matter.Bodies.rectangle(x, y, width, height, {
    isStatic: true,
    render: {
      fillStyle: '#868e96',
    },
  });
}

Matter.World.add(engine.world, [
  wall(280, 0, 560, 20),
  wall(280, 800, 560, 20),
  wall(0, 400, 20, 800),
  wall(560, 400, 20, 800),
]);

for (let x = 0; x <= 560; x += 80) {
  let divider = wall(x, 610, 20, 360);
  Matter.World.add(engine.world, divider);
}

function peg(x, y) {
  return Matter.Bodies.circle(x, y, 14, {
    label: 'peg',
    restitution: 0.5,
    isStatic: true,
    render: { fillStyle: '#82c91e' },
  });
}

let isStaggerRow = false;
for (let y = 200; y <= 400; y += 40) {
  let startX = isStaggerRow ? 80 : 40;
  for (let x = startX; x <= 520; x += 80) {
    Matter.World.add(engine.world, peg(x, y));
  }
  isStaggerRow = !isStaggerRow;
}

function bead() {
  return Matter.Bodies.circle(280, 40, 11, {
    restitution: 0.5,
    render: { fillStyle: '#e64980' },
  });
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}
function dropBead() {
  let droppedBead = bead();

  Matter.Body.setVelocity(droppedBead, {
    x: rand(-0.05, 0.05),
    y: 0,
  });
  Matter.Body.setAngularVelocity(droppedBead, rand(-0.05, 0.05));
  Matter.World.add(engine.world, droppedBead);
}
let dropBeadInterval = setInterval(dropBead, 5000);

Matter.Events.on(engine, 'collisionStart', lightPeg);
function lightPeg(event) {
  event.pairs
    .filter((pair) => pair.bodyA.label === 'peg')
    .forEach((pair) => {
      pair.bodyA.render.fillStyle = '#4c6ef5';
    });
}
}); -->
