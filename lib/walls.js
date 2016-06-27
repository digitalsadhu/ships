'use strict'

import assets from './assets'
const { wall } = assets

import config from './config'
const { grid } = config

const rnd = (min, max) => Math.round(Math.random() * (max - min) + min)

export default function (game) {
  const walls = game.add.group()
  walls.enableBody = true
  const name = wall.name

  for (var i = 0; i < 100; i++) {
    const width = wall.width * rnd(1, grid.maxWidth)
    const height = wall.height * rnd(1, grid.maxHeight)

    {
      const wall = walls.create(width, height, name)
      wall.body.collideWorldBounds = true
      wall.body.immovable = true
    }
  }

  return walls
}

