import Mock from 'mockjs'

Mock.mock('/api/all', {
  'list|1-10': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id': /([a-z][A-Z][0-9]){3}/,
    'name': '@cword( 5, 8 )',
    'price|1000-5000.1-2': 1,
    'inventory|1-10': 1
  }]
})