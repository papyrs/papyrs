import {goto} from '$app/navigation';

export const back = async () => {
  const stack: number | undefined = history.state?.['sveltekit:index'];

  if (!stack || stack === 0) {
    await goBack();
    return;
  }

  history.back();
};

const goBack = async (defaultRoute = '/') => {
  const {referrer} = document;
  return goto(referrer.length > 0 ? referrer : defaultRoute);
};

export const reloadApp = () => window.location.assign('/');
