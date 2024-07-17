import { Router } from 'express';

import StatisticsController, {
  type ISetDeviceInfoBody,
  type IGetAllStatsQuery,
  type IUpdateStatBody,
  type ICreateNewStatBody,
  type IDeleteStatBody,
} from './StatisticsController';

const StatisticsRouter = Router();

/**
 * POST
 */
StatisticsRouter.post('/deviceinfo', req => {
  const controller = new StatisticsController();
  return controller.setDeviceInfo(req, req.body as ISetDeviceInfoBody);
});

// Nuevas rutas
StatisticsRouter.get('/', req => {
  const controller = new StatisticsController();
  return controller.getAllStats(req.query as IGetAllStatsQuery);
});

StatisticsRouter.put('/', req => {
  const controller = new StatisticsController();
  return controller.updateStat(req, req.body as IUpdateStatBody);
});

StatisticsRouter.post('/', req => {
  const controller = new StatisticsController();
  return controller.createNewStat(req, req.body as ICreateNewStatBody);
});

StatisticsRouter.delete('/', req => {
  const controller = new StatisticsController();
  return controller.deleteStat(req, req.body as IDeleteStatBody);
});

export default StatisticsRouter;
