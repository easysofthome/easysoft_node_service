/**
 * @file 后端服务配置DEMO
 * @author fis@baidu.com
 */

module.exports = {
   'DATAPLATFORM_SERVICE': {
       unpack: 'json',
       pack: 'form',
       method: 'GET',
       encoding: 'utf-8',
       balance: 'random',
       protocol: 'http',
       retry: 2,
       timeout: 500,
       basePath:'/mockjs/2',//请求的根路径
       server: [
           { host: '127.0.0.1', port: 8181}
       ]
   }
};
