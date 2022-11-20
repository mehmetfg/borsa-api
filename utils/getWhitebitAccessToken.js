import jwt from "jsonwebtoken";
import nanotime from "nano-time";

const accounts = {
    hasan: {
        pubKey: "e18654355d931aa6b9acc8c3af8f7e73",
        secretKey: "14737db361469e21c00bf2e82569dc2f",
    },
    susa: {
        pubKey: "01ac8741-a625-11ec-9309-16e0b9a7b722",
        secretKey: "B896C030B4BF0EA54C59EEDA691050CA7291FC634643CF6BADAF3B7C2FA10DCB",
    }
};

const getWhitebitAccessToken = (name = "hasan") => {
    const secrets = accounts[name];

    const accessToken = jwt.sign({
        "sub": secrets.pubKey,
        "nonce": nanotime(),
        "recv_window": "30",
        "type": "OpenAPIV2"
    }, secrets.secretKey);

    return accessToken;
}

export default getWhitebitAccessToken;
