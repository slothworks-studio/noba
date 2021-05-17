<script lang="ts">
  import { DeckStore } from '../stores/deckStore';

  import * as Matter from 'matter-js';
  import { Body, Bodies, Composite, Constraint, Events } from 'matter-js';
  import * as MatterAttractors from 'matter-attractors';
  import { onMount, createEventDispatcher } from 'svelte';
  import { Mouse } from 'matter-js';

  export let id = 'grid';
  let cardCount = 50;
  export let worldWidth = 1000;
  export let worldHeight = 1000;
  export let columns = 25;
  export let rows = 25;
  const dispatch = createEventDispatcher();

  onMount(async () => {
    //Setup
    Matter.use(MatterAttractors);
    let engine = Matter.Engine.create(document.getElementById(id));
    engine.gravity.y = 0;
    engine.gravity.x = 0;
    engine.gravity.scale = 0.0000001;

    let render = Matter.Render.create({
      canvas: document.getElementById(id),
      // element: document.getElementById(id),
      engine: engine,
      options: {
        width: worldWidth,
        height: worldHeight,
        background: 'black',
        wireframes: false,
      },
    });

    Matter.Render.run(render);

    let runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Generate boundaries

    function wall(x, y, width, height) {
      return Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        render: {
          fillStyle: 'grey',
        },
        density: 500000,
        restitution: 0.5,
      });
    }

    //Added extra padding to the outside to help with fast moving objects and collision detection
    Matter.World.add(engine.world, [
      wall(worldWidth / 2, -500, worldWidth + 100, 1000),
      wall(worldWidth / 2, worldHeight + 500, worldWidth + 100, 1000),
      wall(-500, worldHeight / 2, 1000, worldHeight + 100),
      wall(worldWidth + 500, worldHeight / 2, 1000, worldHeight + 100),
    ]);

    function createCard(x: number, y: number, width: number, height: number, label: string) {
      let card = Matter.Bodies.rectangle(x, y, width, height, {
        label: label,
        friction: 0.1,
        frictionAir: 0.05,
        restitution: 0.05,
        render: {
          opacity: 1,
          fillStyle: 'white',
        },
      });

      Composite.add(engine.world, card);
      let constraint = Constraint.create({
        bodyA: card,
        pointA: {
          x: x,
          y: y,
        },
        pointB: {
          x: x,
          y: y,
        },

        stiffness: 0.001,
        damping: 0.1,
        render: {
          visible: false,
        },
      });
      Composite.add(engine.world, constraint);
    }

    function createGrid() {
      //worldwidth / columns = initial grid bucket width
      //worldheight / rows = initial grid bucket heighth

      const columnWidth = worldWidth / columns;
      const rowHeight = worldHeight / rows;

      const cardHeight = (rowHeight * 15) / 100;
      const cardWidth = (columnWidth * 15) / 100;

      //rows
      for (let i = 0; i < rows; i++) {
        //columns
        for (let j = 0; j < columns; j++) {
          let y = rowHeight / 2 + rowHeight * i;
          let x = columnWidth / 2 + columnWidth * j;
          createCard(x, y, cardWidth, cardHeight, 'row' + i + ';column' + j);
        }
      }
    }

    createGrid();
    // createCard(50, 50, 20, 30, 'card');
    // interactions
    var mouse = Matter.Mouse.create(render.canvas),
      mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

    let dragBody: Body;
    Events.on(mouseConstraint, 'mousedown', (e) => {
      dragBody = Bodies.circle(e.source.mouse.position.x, e.source.mouse.position.y, 40, {
        label: 'drag',
        render: {
          visible: false,
        },
      });
      Composite.add(engine.world, dragBody);
    });
    Events.on(mouseConstraint, 'mouseup', (e) => {
      Composite.remove(engine.world, dragBody);
      dispatch('gridUp');
    });

    Matter.Composite.add(engine.world, mouseConstraint);
  });

</script>

<canvas {id} />

<style>
</style>
