const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const fs = require('fs');

// 读取 idList.txt，转换为数组
const idList = fs.readFileSync('./idList.txt', 'utf8').toString().split('\n');

function createModuleId(path) {
    const projectRootPath = __dirname;
    let moduleId = path.substr(projectRootPath.length + 1);
    return moduleId;
  }

const config = {
    serializer: {
        createModuleIdFactory: function () {
          return function (path) {
            return createModuleId(path);
          };
        },
        processModuleFilter: function (modules) {
            const mouduleId = createModuleId(modules.path);
            
            // 通过 mouduleId 过滤在 common.bundle 里的数据
            if (idList.indexOf(mouduleId) < 0) {
              console.log('createModuleIdFactory path', mouduleId);
              return true;
            }
            return false;
          },
      },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
