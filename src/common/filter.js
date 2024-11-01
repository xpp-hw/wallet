import * as dayjs from 'dayjs';

const statusObj = {
    checking: '审核中',
    success: '审核通过',
    fail: '业务请求失败',
    reject: '审核失败',
    claimSuspend: '理赔中止',
    claimedSuspend: '赔后中止',
    terminalSuspend: '退保中止',
    expireSuspend: '满期中止',
    normal: '待查询'
};

const formatDate = datetime => dayjs(datetime).format('YYYY-MM-DD HH:mm:ss');
const formatCHNDate = datetime => dayjs(datetime, 'YYYYMMDD').format('YYYY年MM月DD日');
const formatOrderStatus = status => statusObj[status];

export {
    formatDate,
    formatCHNDate,
    formatOrderStatus
};
