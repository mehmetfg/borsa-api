import { NextApiRequest, NextApiResponse } from "next"

import fetcher from "../../../client/fetcher";
import getAccessToken from "../../../utils/getAccessToken";

/**
 * @param {NextApiRequest} request
 * @param {NextApiResponse} response
 */
export default async function balance(request, response) {
    const { asset, account } = request.query;

    if (!asset) {
        response.status(400).json({ "error": "Asset type must be sent." })
        return;
    }

    try {
    //const endpoint = `https://big.one/api/v3/viewer/trades?asset_pair_name=CYCE-USDT&limit=200`;
    const endpoint = `https://big.one/api/v3/viewer/accounts/${asset.toUpperCase()}`;
        const result = await fetcher(endpoint, {
            accessToken: account ? getAccessToken(account) : getAccessToken(),
        });
        const data = result?.data;

        return response.status(200).json(data);
    } catch (error) {
        return response.status(error.status).json(error.info);
    }
}