import {Router, Request, Response} from 'npm:express@4.18.2';
import CachedRequests from '../cache/CachedRequests.ts';
import payments from '../requests/payments.ts';
import logger from '../utils/logger.ts';
const router = Router();

router.get('/categories', async function(_req:Request, res:Response) {
    logger.info("Getting categories");
    res.json(await CachedRequests.getCategories())
})

router.get('/category/:id', async function(req:Request, res:Response) {
    res.json(await CachedRequests.getCategory(parseInt(req.params.id)))
})

router.get('/packages', async function(_req:Request, res:Response) {
    res.json(await CachedRequests.getPackages())
})

router.get('/package/:id', async function(req:Request, res:Response) {
    res.json(await CachedRequests.getPackage(parseInt(req.params.id)))
})

router.post('/checkout', async function(req:Request, res:Response) {
    if (!req.body.username || !req.body.packageID) {
        res.status(400).json({
            error: "Missing username or packageID"
        })
        return;
    }

    try {
        res.json({
            url: await payments(req.body.username, parseInt(req.body.packageID))
        })
    } catch (_e) {
        res.status(500).json({
            error: "Error while generating payment, please try again later"
        })
        return;
    }
})

export default router;