/**
 * 更强大的宏命令, 可以与 10.5 案例结合使用
 * */

class CloseDoorCommand {
  execute() {
    console.log("关上门")
  }
}

class OpenPcCommand {
  execute() {
    console.log("打开电脑")
  }
}

class OpenQQCommand {
  execute() {
    console.log("打开QQ")
  }
}

class RootCommand {
  constructor() {
    this.commands = []
  }
  add(command) {
    this.commands.push(command)
  }
  execute() {
    this.commands.forEach(command => command.execute())
  }
}

const closeDoorCommand = new CloseDoorCommand()
const openPcCommand = new OpenPcCommand()
const openQQCommand = new OpenQQCommand()

const rootCommand = new RootCommand()
rootCommand.add(closeDoorCommand)
rootCommand.add(openPcCommand)
rootCommand.add(openQQCommand)

rootCommand.execute()


