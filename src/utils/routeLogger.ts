import {Router, Request, Response, NextFunction} from 'npm:express@4.18.2';
import logger from './logger.ts';

const router = Router();

router.use(async function(req:Request, res:Response, next:NextFunction) {
    res.on('finish', await function() {
        const status = res.statusCode ? res.statusCode : 200;
        logger.info(`${logger.colors.blue} ${req.method} ${logger.colors.reset} ${req.path} ${logger.colors.yellow} ${status} ${logger.colors.reset}`);
        next();
    });
    next();
  });

export default router;