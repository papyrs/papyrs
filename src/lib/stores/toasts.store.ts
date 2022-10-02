import {toasts, type ToastMsg} from '@papyrs/ui';

export const toastsError = (msg: {text: string; detail?: unknown}) => toasts.error(msg);

export const toastsShow = (msg: ToastMsg) => toasts.show(msg);

export const toastsHide = (msg: ToastMsg) => toasts.hide();
