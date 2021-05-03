# 三、Lerna简介

> Lerna 是一个优化**基于git+npm**的**多package项目**的管理工具
>
> Lerna 是架构优化的产物，它揭示了一个架构真理：项目复杂度提升后，就需要对项目进行架构优化。
>
> 架构优化的主要目标往往都是以**效能为核心**。
>
> 官网：https://lerna.js.org/
>
> Git: https://github.com/lerna/lerna#readme

## 1、lerna-开发脚手架流程（划重点）

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/png/114317/1619062986108-assets/web-upload/231d8838-bea7-421b-bb4b-838ba9b8e250.png?x-oss-process=image%2Fresize%2Cw_440" alt="lerna-开发脚手架流程" style="width: 500px; height: 600px;">

### 1.1、脚手架项目初始化

```shell
# 全局安装 lerna
npm install -g lerna

# 新建项目
cd desktop
git init zhz-cli && cd zhz-cli

# 初始化 lerna
lerna init
```

🌟**重点**🌟：添加`.gitignore`初始化git：

```
.DS_Store
.vscode
.idea
node_modules
Thumbs.db

package/**/node_modules
```

自此，脚手架的项目初始化完成。

### 1.2、创建package

1. 创建两个`package`

   * `core`:

     * 包含脚手架的`bin`文件，即：`core`项目一旦安装到操作系统，就可以生成脚手架；

       ```shell
       Thales$ cd zhz-cli
       Thales$ lerna create core
       package name: (core) @zhz-cli/core
       ```

     * npm 官网中新建 Organizations ，名称为 `zhz-cli`，确保可以发包；

   * `utils`:

     * 工具类项目，是其他`package`工具方法的依赖；

       ```shell
       Thales$ cd zhz-cli
       Thales$ lerna create utils
       package name: (core) @zhz-cli/utils
       ```

2. 安装依赖

   ```shell
   lerna add mocha packages/core --dev
   ```

3. 删除依赖

   ```shell
   lerna clean
   ```

4. 根据`package.json`的`"dependencies":{}`内容安装依赖：

   ```shell
   lerna bootstrap
   ```

5. 将lerna管理的所有package下的相互依赖进行link

   ```shell
   lerna link
   ```

### 1.3、脚手架开发和测试

1. Execute an arbitrary command in each package

   ```shell
   $ lerna exec -- <command> [..args] # runs the command in all packages
   $ lerna exec -- rm -rf ./node_modules
   $ lerna exec --scope my-component -- ls -la
   ```

2. Run an npm script in each package that contains that script

   ```shell
   $ lerna run <script> -- [..args] # runs npm run my-script in all packages that have it
   $ lerna run test
   $ lerna run build
   ```

### 1.4、脚手架发布上线

1. [`@lerna/version`](https://github.com/lerna/lerna/tree/main/commands/version#lernaversion)

2. [`@lerna/changed`](https://github.com/lerna/lerna/tree/main/commands/changed#readme)

3. [`@lerna/diff`](https://github.com/lerna/lerna/tree/main/commands/diff#lernadiff)

4. [`@lerna/publish`](https://github.com/lerna/lerna/tree/main/commands/publish#lernapublish)🌟**坑**🌟：

   * 发布时会自动执行：`git add package-lock.json`，所以 `package-lock.json` 不要加入 `.gitignore`；

   * 先创建远程仓库，并且同步一次 master 分支；

   * 执行 `lerna publish` 前先完成 `npm login`；

   * 如果发布的 npm 包名为：`@xxx/yyy` 的格式，需要先在 npm 注册名为：xxx 的 organization，否则可能会提交不成功；

   * 发布到 npm group 时默认为 private，所以我们需要手动在每个`package/package.json` 中添加如下配置：

     ```json
     "publishConfig": {
       "access": "public"
     }
     ```

## 2、源码分析收获

### 2.1、本地依赖

`package.json`中引用本地依赖：

```json
"dependencies": {
  "lerna": "file:core/lerna"
}
```

官方文档：https://docs.npmjs.com/cli/v6/configuring-npm/package-json#local-paths

`lerna publish`发布的时候会将`file:`进行替换，源码如下：

```js
resolveLocalDependencyLinks() {
    // resolve relative file: links to their actual version range
    const updatesWithLocalLinks = this.updates.filter(node =>
      Array.from(node.localDependencies.values()).some(resolved => resolved.type === "directory")
    );
    
    return pMap(updatesWithLocalLinks, node => {
      for (const [depName, resolved] of node.localDependencies) {
        // regardless of where the version comes from, we can't publish "file:../sibling-pkg" specs
        const depVersion = this.updatesVersions.get(depName) || this.packageGraph.get(depName).pkg.version;
    
        // it no longer matters if we mutate the shared Package instance
        node.pkg.updateLocalDependency(resolved, depVersion, this.savePrefix);
      }
    
      // writing changes to disk handled in serializeChanges()
    });
}
```

### 2.2、