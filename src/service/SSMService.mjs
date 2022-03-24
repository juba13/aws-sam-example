// import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm"; // ES module import
// const ssmClient = new SSMClient();
// const input = { "Name": "/configItem" }
// const command = new GetParameterCommand(input);
// export const parameter = await ssmClient.send(command); // top-level await
export const parameter = await (async () => {return "Hi Jubayer"}); // top-level await

// async () => {return "Hi Jubayer"}