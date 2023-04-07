import {Router, Request, Response, NextFunction} from 'npm:express@4.18.2';
import logger from './logger.ts';

const router = Router();

router.get('/', function(_req:Request, res:Response) {
  res.json({
      status: "Online"
  })
})

router.use(async function(req:Request, res:Response, next:NextFunction) {
    const current = new Date();
    res.on('finish', await function() {
        const finish = new Date();
        const time = finish.getTime() - current.getTime();
        const status = res.statusCode ? res.statusCode : 200;
        logger.info(`${logger.colors.blue} ${req.method} ${logger.colors.reset} ${req.path} ${logger.colors.yellow} ${status} ${logger.colors.reset} ${time}ms`);
        next();
    });
    next();
  });

export default router;