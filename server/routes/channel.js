import express from 'express';

import * as ChannelController from '../controllers/channel-controller';

const router = express.Router();

router.get('/get-channels', ChannelController.GetChannel);

export default router;