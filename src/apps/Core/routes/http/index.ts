import { Router } from 'express'
import { glob } from 'glob'
import path from 'path'

export function registerRoutes (router: Router) {
  const routes = glob.sync(path.join(__dirname, '/**/*.route.*'), { windowsPathsNoEscape: true })
  routes.filter(route => !route.endsWith('.map')).map(route => register(route, router))
}

function register (routePath: string, router: Router) {
  const route = require(routePath)
  route.register(router)
}