import { getToken } from 'next-auth/jwt';
import Twitter from "twitter-lite";


const twitterUser = async (req, res) => {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });

    try {
        const twitterClient = new Twitter({
            consumer_key: process.env.TWITTER_ID,
            consumer_secret: process.env.TWITTER_SECRET,
            access_token_key: token.credentials.authToken,
            access_token_secret: token.credentials.authSecret
        });

        const tweets = await twitterClient.get("statuses/user_timeline");

        const data = {
            tweets
        };

        return res.status(200).json({
            status: 'Ok',
            data
        });
    } catch (error) {
        return res.status(500).send({ error });
    }
}

export default twitterUser