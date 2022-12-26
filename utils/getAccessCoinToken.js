import jwt from "jsonwebtoken";
import nanotime from "nano-time";

const accounts = {
    hasan: {
        pubKey: "1cad0dc4d595041cb7e2b5c136c2011f",
        secretKey: "cb9db43d5ee9c0fd5fb838f72d87c76d",
    },
    susa: {
        pubKey: "01ac8741-a625-11ec-9309-16e0b9a7b722",
        secretKey: "B896C030B4BF0EA54C59EEDA691050CA7291FC634643CF6BADAF3B7C2FA10DCB",
    }
};

const getAccessCoinToken = (name = "hasan") => {
    const secrets = accounts[name];

    const accessToken = jwt.sign({
        "sub": "1cad0dc4d595041cb7e2b5c136c2011f",
        "nonce": nanotime(),
        "recv_window": "30",
        "type": "OpenAPIV2"
    }, "cb9db43d5ee9c0fd5fb838f72d87c76d");

    return accessToken;
}

export default getAccessCoinToken;
