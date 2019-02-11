const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  historyTabs: state => state.tabs.historyTabs,
  routersArr: state => state.app.routers,
}
export default getters
