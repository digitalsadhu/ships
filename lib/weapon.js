'use strict'

/* global Phaser */

import assets from './assets'
const { bullet } = assets

export default function (game) {
  return function (options = {}) {
    const weapon = game.add.weapon(options.simultaneousBullets || 1, options.bulletSprite || bullet.name)
    weapon.bulletKillType = options.bulletKillType || Phaser.Weapon.KILL_WORLD_BOUNDS
    weapon.bulletSpeed = options.bulletSpeed || 400

    return weapon
  }
}
