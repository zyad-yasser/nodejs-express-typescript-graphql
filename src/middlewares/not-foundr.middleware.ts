import { config } from '../config';
import * as status from 'http-status-codes';

export const notFound = (req, res) => {
  res
    .status(status.NOT_FOUND)
    .json({
      application: config.appName,
      message: status.getStatusText(status.NOT_FOUND),
    });
};
