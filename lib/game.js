'use strict'
/* global Phaser */

const preloadTasks = []
const createTasks = []
const updateTasks = []
const renderTasks = []

export function preload (task) {
  preloadTasks.push(task)
}

export function create (task) {
  createTasks.push(task)
}

export function update (task) {
  updateTasks.push(task)
}

export function render (task) {
  renderTasks.push(task)
}

export function start (options) {
  const game = new Phaser.Game(options.width, options.height, Phaser.AUTO, '', {
    preload: preload, create: create, update: update, render: render
  })

  function preload () {
    for (let task of preloadTasks) {
      task(game)
    }
  }

  function create () {
    for (let task of createTasks) {
      task(game)
    }
  }

  function update () {
    for (let task of updateTasks) {
      task(game)
    }
  }

  function render () {
    for (let task of renderTasks) {
      task(game)
    }
  }
}
