/**
 * Created by wspandihai on 2016/7/22.
 * 用于自己扩展node-ral,主要是扩展node-ral不支持 basepath的用法另外就是不支持同事请求多个接口的需求
 */

var _ = require('lodash');


module.exports.ral_extend = ['promise',
    function (app, conf) {
        var originRal = yog.ral;

        function ralPromise(name, options) {

            var getPromise = function (namevalue, options) {

                return new yog.Promise(function (resolve, reject) {
                    var conf = originRal.getConf(namevalue);
                    if (conf && conf.basePath) {
                        options.path = conf.basePath + options.path;
                    }
                    originRal(namevalue, options).on('data', function (data) {
                        resolve(data);
                    }).on('error', function (error) {
                        reject(error);
                    });
                })
            };
            if (_.isString(name)) {
                name = [name];
                options = [options];
            }
            var ralPromises = [];
            for (var i = 0, len = name.length; i < len; i++) {
                ralPromises.push(getPromise(name[i], options[i]));
            }
            return yog.Promise.all(ralPromises).then(function (daraArry) {
                //如果是单独请求就稍微包装一下返回
                return daraArry ? daraArry.length <= 1 ? daraArry[0] : daraArry : daraArry;
            });

        }

        yog.ralPromise = ralPromise;
        yog.ralP = ralPromise;

    }
];
module.exports.ral_extend.defaultConf = {
    overrideRAL: false,
    overridePromise: true
};

