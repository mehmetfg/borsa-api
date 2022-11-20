import fetcher from "../../client/fetcher";

export default async function trades(req, res) {
    const result = await fetcher("https://big.one/api/v3/asset_pairs/cyce-usdt/trades?limit=200");
    const data = result?.data;

    return res.status(200).json(data);
}
