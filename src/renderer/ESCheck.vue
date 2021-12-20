<template>
  <div class="ESCheck">
    <!-- <h1>ES 版本检查</h1> -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="预期版本">
        <el-select v-model="form.version" placeholder="请选择ES版本">
          <el-option v-for="(item) in ESList" :key="item.ecmaVersion"
            :value="item.ecmaVersion"
            :label="item.aliases.join('/').toUpperCase()"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="代码路径">
        <el-input v-model="form.path" placeholder="js代码存放的文件夹路径"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onBegin">开始检查</el-button>
      </el-form-item>

      <div v-if="result">
        <h5>程序运行日志</h5>
        <pre class="log">{{ result }}</pre>
      </div>

    </el-form>
  </div>
</template>

<script>
import { remote } from 'electron'
const path = require('path')

const ESMap = {
  // '3': {
  //   ecmaVersion: '3',
  //   aliases: ['es3'],
  // },
  // '4': {
  //   ecmaVersion: '4',
  //   aliases: ['es4'],
  // },
  '5': {
    ecmaVersion: '5',
    aliases: ['es5'],
  },
  '2015': {
    ecmaVersion: '6',
    aliases: ['es6', 'es2015'],
  },
  '2016': {
    ecmaVersion: '7',
    aliases: ['es7', 'es2016'],
  },
  '2017': {
    ecmaVersion: '8',
    aliases: ['es8', 'es2017'],
  },
  '2018': {
    ecmaVersion: '9',
    aliases: ['es9', 'es2018'],
  },
  '2019': {
    ecmaVersion: '10',
    aliases: ['es10', 'es2019'],
  },
  '2020': {
    ecmaVersion: '2020',
    aliases: ['es11', 'es2020'],
  },
  '2021': {
    ecmaVersion: '2021',
    aliases: ['es12', 'es2021'],
  },
}

const ESList = Object.values(ESMap).sort((a, b) => Number(a.ecmaVersion) - Number(b.ecmaVersion))

function getTime () {
  return new Date().toLocaleString() + ' '
}

export default {
  components: {
    // Demo
  },
  data () {
    return {
      form: {
        version: '5', // es5
        path: require('os').homedir() // process.cwd(), // path.resolve(process.argv0, '../'),
      },
      result: '',
      errorList: [],
      ESList: Object.freeze(ESList),
    }
  },
  methods: {
    async onBegin () {
      this.errorList = []
      this.result = getTime() + '开始检查\n'
      await this.ESCheck()

      if (this.errorList.length) {
        this.result += `已完成，共计: ${this.errorList.length}个文件未通过检查。\n错误:\n` + JSON.stringify(this.errorList, null, '  ')
      } else {
        this.result += getTime() + '已完成，全部js已通过检查。\n'
      }

      remote.getCurrentWindow().show()
    },
    async ESCheck () {
      this.result += getTime() + '正在获取全部的js文件\n'
      const files = await this.getFiles()
      this.result += getTime() + `共计${files.length}个文件\n`

      let ecmaVersion = this.form.version
      const acorn = await import('acorn') // 按需加载，让界面渲染更快
      const fs = await import('fs-extra').then(lib => lib.default)
      const { errorList, form } = this
      const dir = form.path
      const acornOptions = { ecmaVersion: parseInt(ecmaVersion, 10), silent: true }

      this.result += getTime() + `开始解析js文件...\n`
      for(let index = 0; index < files.length; index++) {
        let file = files[index]
        let filePath = path.resolve(dir, file)
        try {
          let encoding = 'utf8'
          let string = await fs.readFile(filePath, encoding)
          let ast = acorn.parse(string, acornOptions)
          console.log(filePath, ast)
        } catch (error) {
          const errorObj = {
            error,
            file
          }
          console.error(filePath, error)
          errorList.push(errorObj)
        }

        if (index + 1 % 10 === 0) {
          this.result += getTime() + `已完成${index + 1}个文件\n`
        }
      }
    },
    async getFiles () {
      const glob = require('fast-glob')
      const options = {
        cwd: this.form.path,
      }
      const files = await glob('**/**.js', options)
      return files
    },
  },
  mounted () {
    import('fs-extra').then(lib => lib.default).then(async (fs) => {
      let desktopDir = path.resolve(require('os').homedir(), './Desktop/')
      if (await fs.pathExists(desktopDir)) {
        this.form.path = desktopDir
      }
    })
  }
}
</script>

<style lang="scss">
.ESCheck {
  .log {
    width: 100%;
    height: 250px;
    overflow: scroll;
  }
}
</style>
