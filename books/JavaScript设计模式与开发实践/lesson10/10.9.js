/**
 * 引用父对象,对当前组合对象删除
 * 类似双向链表的数据结构
 */
/**
 * 分别创建宏对象与叶对象
 *
 * 1.宏对象可正常调用 add 添加宏对象或叶对象
 * 2.叶对象也添加 add 方法, 如果被调用就抛出错误警告("叶对象不能添加子节点")
 * */

class Leaf {
  constructor(msg) {
    this.msg = msg
    this.parent = null
  }
  execute() {
    console.log(this.msg)
  }
  add() {
    throw new Error("叶节点不能添加子节点")
  }
  remove() {
    if (!this.parent) return

    this.parent.leafs.forEach((leaf, i) => {
      if (leaf === this) {
        this.parent.leafs.splice(i, 1)
      }
    })
  }
}

class Composition {
  constructor() {
    this.leafs = []
  }
  add(leaf) {
    leaf.parent = this
    this.leafs.push(leaf)
  }
  execute() {
    this.leafs.forEach(leaf => leaf.execute())
  }
}

const closeDoorLeaf = new Leaf("关上门")
const openPcLeaf = new Leaf("打开电脑")
const openQQLeaf = new Leaf("打开QQ")

const composition = new Composition()

composition.add(closeDoorLeaf)
composition.add(openPcLeaf)
composition.add(openQQLeaf)

openQQLeaf.remove()

composition.execute()