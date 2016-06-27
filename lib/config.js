import assets from './assets'

const config = {
  world: {
    width: 800,
    height: 600
  },

  grid: {
    width: assets.wall.width,
    height: assets.wall.height,
    maxWidth: Math.round(800 / 32),
    maxHeight: Math.round(600 / 32)
  }
}

export default config
