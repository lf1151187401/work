'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/login', controller.home.index);
  router.get('/api/allVote', controller.list.index);
  router.post('/api/add', controller.add.index);
  router.post('/api/getlist', controller.getlist.index);

};
