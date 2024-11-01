import { Toast } from 'mand-mobile';

// eslint-disable-next-line consistent-return
Toast.info = (content = '', duration = 3000, hasMask = false, parentNode = document.body) => {
    if (content) {
        return Toast({
            icon: '',
            content,
            duration,
            hasMask,
            parentNode
        });
    }
};

export default Toast;
