export async function handler() {
    try {
        // const ret = await axios(url);
       const response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                // location: ret.data.trim()
            })
        }
        return response
    } catch (err) {
        console.log(err);
        return err;
    }

    
};