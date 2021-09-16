import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../utils/auth0';

export default async function callback(request: NextApiRequest, response: NextApiResponse<any>) {
  try {
    await auth0.handleCallback(request, response, { redirectTo: '/' });
  } catch (error) {
    console.error(error);
    response.status(error.status || 500).end(error.Message);
  }
}
