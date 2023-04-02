import {Router, Request, Response} from 'npm:express@4.18.2';
import CachedRequests from '../cache/CachedRequests.ts';
import logger from '../utils/logger.ts';
const router = Router();

router.get('/categories', async function(_req:Request, res:Response) {
    logger.info("Getting categories");
    res.json(await CachedRequests.getCategories())
})

export default router;