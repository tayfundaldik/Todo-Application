
import { apiClient } from "./ApiClient";

export const retrieveHelloWorldBean = () => apiClient.get('/hello-world-bean')
export const retrieveHelloWorldPath = (username,token) => apiClient.get(`/hello-world/path-variable/${username}`,token
//{
//     headers : {
//         Authorization : token
//     }
// }
)