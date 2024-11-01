/* eslint-disable func-names */
// module.exports = function(imitator) {
//     imitator(/\/.*/, 'base host');
// }
// imitator -f data.js

const BaseData = {
    msgCd: '00000',
    msgInfo: '成功'
};

module.exports = function (imitator) {
    imitator('/activities/v1/orchard/index', Object.assign({}, BaseData, {
    }));

    // imitator.base('http://172.16.49.61:8080');
};
