'use strict'

/*global Phaser*/

import config from './lib/config'
import assets from './lib/assets'
import { start, preload, create, update } from './lib/game'
import walls from './lib/walls'
import player from './lib/player'

let player1
let player2
let wallGroup

preload(game => {
  game.load.image(assets.wall.name, assets.wall.path)
  game.load.image(assets.ship.name, assets.ship.path)
  game.load.image(assets.ship2.name, assets.ship2.path)
  game.load.image(assets.bullet.name, assets.bullet.path)
})

create(function (game) {
  game.physics.startSystem(Phaser.Physics.ARCADE)
})

create(function (game) {
  wallGroup = walls(game)
})

create(function (game) {
  player1 = player(game)({
    x: 0,
    y: 0,
    keys: {
      left: Phaser.KeyCode.A,
      right: Phaser.KeyCode.D,
      up: Phaser.KeyCode.W,
      fire: Phaser.KeyCode.F
    }
  })
  player2 = player(game)({
    x: game.world.width,
    y: game.world.height,
    keys: {
      left: Phaser.KeyCode.LEFT,
      right: Phaser.KeyCode.RIGHT,
      up: Phaser.KeyCode.UP,
      fire: Phaser.KeyCode.SPACEBAR
    }
  })
})

update(function (game) {
  function bulletHitWall (bullet, wall) {
    bullet.kill()
  }

  function killPlayer (bullet, player) {
    bullet.kill()
    player.kill()
    const style = { font: 'bold 32px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' }
    game.add.text(0, 0, 'GAME OVER!', style)
  }

  player1.body.velocity.x = 0
  player1.body.velocity.y = 0

  player2.body.velocity.x = 0
  player2.body.velocity.y = 0

  game.physics.arcade.collide(player1, wallGroup)
  game.physics.arcade.collide(player2, wallGroup)

  game.physics.arcade.collide(player1.weapon.bullets, wallGroup, bulletHitWall, null, this)
  game.physics.arcade.collide(player2.weapon.bullets, wallGroup, bulletHitWall, null, this)

  game.physics.arcade.collide(player1.weapon.bullets, player2, killPlayer, null, this)
  game.physics.arcade.collide(player2.weapon.bullets, player1, killPlayer, null, this)
})

update(function (game) {
  player1.act()
  player2.act()
})

start({
  width: config.world.width,
  height: config.world.height
})
