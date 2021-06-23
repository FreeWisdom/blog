const snabbdom = window.snabbdom

// 定义 patch
const patch = snabbdom.init([
    snabbdom_class,
    snabbdom_props,
    snabbdom_style,
    snabbdom_eventlisteners
])

// 定义 h
const h = snabbdom.h

const container = document.getElementById('container')

// 生成 vnode
let vnode = h('ul#list', {}, [
    h('li.item', {}, 'Item 1'),
    h('li.item', {}, 'Item 2')
])
patch(container, vnode)

document.getElementById('btn-change').addEventListener('click', () => {
    // 生成 newVnode
    let newVnode = h('ul#list', {}, [
        h('li.item', {}, 'Item 1'),
        h('li.item', {}, 'Item B'),
        h('li.item', {}, 'Item 3')
    ])

    // let patchVnode = patch(vnode, newVnode);

    // console.log(vnode, newVnode, patchVnode);
    // console.log(newVnode === patchVnode);        // true

    vnode = patch(vnode, newVnode) // patch 之后，应该用新的覆盖现有的 vnode ，否则每次 change 都是新旧对比
})
