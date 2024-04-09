const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const fs = require('fs');
const config = {
    serializer: {
        createModuleIdFactory: function () {
          return function (path) {
            // 根据文件的相对路径构建 ModuleId
            const projectRootPath = __dirname;
            let moduleId = path.substr(projectRootPath.length + 1);
            
            // 把 moduleId 写入 idList.txt 文件，记录公有模块 id
            fs.appendFileSync('./idList.txt', `${moduleId}\n`);
            return moduleId;
          };
        },
      },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
