'use strict'

/* global Phaser */

import weapon from './weapon'

import assets from './assets'
const { ship } = assets

export default function (game) {
  return function (options = {}) {
    const player = game.add.sprite(options.x, options.y, ship.name)
    game.physics.enable(player, Phaser.Physics.ARCADE)
    player.body.collideWorldBounds = options.collideWorldBounds || true
    player.anchor.set(options.anchor || 0.5)
    player.body.drag.set(options.drag || 70)
    player.body.maxVelocity.set(options.maxVelocity || 200)

    player.weapon = weapon(game)()
    player.weapon.trackSprite(player, 0, 0, true)

    player.keys = {
      fire: game.input.keyboard.addKey(options.keys.fire),
      left: game.input.keyboard.addKey(options.keys.left),
      right: game.input.keyboard.addKey(options.keys.right),
      up: game.input.keyboard.addKey(options.keys.up)
    }

    player.act = function () {
      if (player.keys.up.isDown) {
        game.physics.arcade.accelerationFromRotation(player.rotation, 6000, player.body.acceleration)
      } else {
        player.body.acceleration.set(0)
      }

      if (player.keys.left.isDown) {
        player.body.angularVelocity = -300
      } else if (player.keys.right.isDown) {
        player.body.angularVelocity = 300
      } else {
        player.body.angularVelocity = 0
      }

      if (player.keys.fire.isDown) {
        player.weapon.fire()
      }
    }

    return player
  }
}
