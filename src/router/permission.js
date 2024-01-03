import router from './index';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getBotStatus } from '@/api/bot.api';
import { useBotStore } from '@/store/bot';

const whiteList = ['/', '/login'];

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const botStore = useBotStore();

  try {
    await getBotStatus();

    botStore.setProcessStatus({ processStatus: true });

    if (whiteList.indexOf(to.path) !== -1) {
      next({ path: '/bot/message' });
    } else {
      next();
    }
  } catch (error) {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ path: '/' });
    }
  }

  NProgress.done();
});

router.afterEach(() => {
  NProgress.done();
});
