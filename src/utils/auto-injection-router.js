// 自动注入路由
const directory = require.context('../views/autoRouter', true, /\.vue$/, 'lazy')

// 创建一个空路由数组
const routerList = []
directory.keys().forEach(key => {
  // debugger
  let catalog = key.split('/')
  // 获取目录名称做为路由地址
  /*
    * b
    * c/c1
    * c/c2
    * c/c3/c3-1
    * c/c3/c3-2
  */
  const completeName = catalog.length >= 3 ? catalog.slice(1, catalog.length - 1).join('/') : catalog.pop().split('.')[0]
  const routerObj = {};
  routerObj.path = completeName.replace(/\d\.vue$/, '/:id')
  routerObj.name = completeName.replace(/\d\.vue$/, '');
  routerObj.component = () => directory(key).default || directory(key);
  routerList.push(routerObj)
})
console.log(routerList)

export default routerList