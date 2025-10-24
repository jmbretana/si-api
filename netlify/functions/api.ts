import 'dotenv/config';
import serverless from 'serverless-http';
import app from '../../src/app';

export const handler = serverless(app);
