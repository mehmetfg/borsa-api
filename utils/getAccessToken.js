import jwt from "jsonwebtoken";
import nanotime from "nano-time";

const accounts = {
    hasan: {
        pubKey: "83ecadb9-a624-11ec-9309-16e0b9a7b722",
        secretKey: "265F5EE41041AE887B6E40287D6A840C56391F6F86CBBAA20FB551FAE56F9974",
    },
    susa: {
        pubKey: "01ac8741-a625-11ec-9309-16e0b9a7b722",
        secretKey: "B896C030B4BF0EA54C59EEDA691050CA7291FC634643CF6BADAF3B7C2FA10DCB",
    }
};

const getAccessToken = (name = "hasan") => {
    const secrets = accounts[name];

    const accessToken = jwt.sign({
        "sub": secrets.pubKey,
        "nonce": nanotime(),
        "recv_window": "30",
        "type": "OpenAPIV2"
    }, secrets.secretKey);

    return accessToken;
}

export default getAccessToken;
