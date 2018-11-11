const getters = {
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
	permission_routers: state => state.permission.routers,
	addRouters: state => state.permission.addRouters,
    roles: state => state.user.roles,
    token: state => state.user.token,
  }
  export default getters