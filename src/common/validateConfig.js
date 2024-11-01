import { localize, extend } from "vee-validate";
import zhCN from "vee-validate/dist/locale/zh_CN.json";
import * as rules from "vee-validate/dist/rules";
import assignIn from "lodash/assignIn";

zhCN.messages.required = "{_field_}不能为空";
localize("zh_CN", zhCN);

// eslint-disable-next-line no-useless-escape
const validateName = (value) =>
    /^((?![\u3000-\u303F])[\u2E80-\uFE4F]|\·)*(?![\u3000-\u303F])[\u2E80-\uFE4F](\·)*$/.test(
        value
    );
const isTrue = (value) => value === true;
const validateIdNo = (value) => /(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
const validatetellNo = (value) => /^[^a-zA-Z\u4e00-\u9fa5]+$/.test(value); // 联系电话-可以是座机
const validatePhoneNo = (value) => /^[1][0-9]{10}$/.test(value); // 11位手机号码
const validateArea = (value) => value.indexOf("请选择区县") === -1;
const validateBankNo = (value) => /^[1-9]\d{14,20}$/.test(value); // 15-21位数字
const validateVerNo = (value) => /^[a-zA-Z]{4}$/.test(value);
const validateSmsNo = (value) => /^\d{4}$/.test(value);
const validatePayPwd = (value) => /^\d{6}$/.test(value);
const validateLoginPwd = (value) => {
    if (value.length < 8 || value.length > 16) {
        return false;
    }
    if (/[\u4e00-\u9fa5]+$/.test(value)) {
        return false;
    }
    return true;
};

const nonEmpty = (value) => {
    if (value) {
        return true;
    }
    return false;
};
const newRules = {
    username: {
        validate: validateName,
        message: "请输入正确的姓名",
    },
    isTrue: {
        validate: isTrue,
    },
    nonEmpty: {
        validate: nonEmpty,
        message: "请输入正确的信息",
    },
    idNo: {
        validate: validateIdNo,
        message: "请输入正确的身份证号",
    },
    tellNo: {
        validate: validatetellNo,
        message: "请输入正确的手机号",
    },
    phoneNo: {
        validate: validatePhoneNo,
        message: "请输入正确的手机号",
    },
    checkArea: {
        validate: validateArea,
        message: "请选择收货人收货地址",
    },
    bankNo: {
        validate: validateBankNo,
        message: "请输入正确的银行卡号",
    },
    verNo: {
        validate: validateVerNo,
        message: "请输入正确的图形码",
    },
    smsNo: {
        validate: validateSmsNo,
        message: "请输入正确的验证码",
    },
    loginPwd: {
        validate: validateLoginPwd,
        message: "请输入正确的登录密码",
    },
    payPwd: {
        validate: validatePayPwd,
        message: "请输入正确的支付密码",
    },
    smsNo_6: {
        validate: validatePayPwd,
        message: "请输入正确的验证码",
    },
};

assignIn(rules, newRules);
Object.keys(rules).forEach((rule) => {
    extend(rule, rules[rule]);
});
