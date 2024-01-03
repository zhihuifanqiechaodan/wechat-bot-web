import { io } from 'socket.io-client';

export default {
  install: (app, options) => {
    const socket = io(options.url, options.options)
      .on('connect', () => {
        console.log('connect');
      })
      .on('disconnect', () => {
        console.log('disconnect');
      })
      .on('connect_error', () => {
        console.log('connect_error');
      });
    app.config.globalProperties.$socket = socket;
  }
};
