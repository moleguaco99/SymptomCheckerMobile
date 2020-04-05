const apiUrl = '192.168.0.103:5000';
export const httpApiUrl = `http://${apiUrl}`;
const initialHeaders = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
};

const buildHeaders = () => {
    const headers = {...initialHeaders};
    return headers;
}

const defaultError = { issue: [{error: 'Unexpected error'}]};

const withErrorHandling = fetchPromise => 
        fetchPromise.then(response => Promise.all([response.ok, response.json()]))
                    .then(([responseOk, responseJson]) => {
                        if(responseOk){
                            return responseJson;
                        }
                        const message = (responseJson || defaultError).issue
                            .map(it => it.error)
                            .join('\n');
                        throw new Error(message);
                    });

export const httpGet = path =>
    withErrorHandling(
        fetch(`${httpApiUrl}/${path}`, {
            method: 'GET',
            headers: buildHeaders()
        })
    );

export const httpPost = (path, content) =>
    withErrorHandling(
        fetch(`${httpApiUrl}/${path}`, {
            method: 'POST',
            body: JSON.stringify(content),
            headers: buildHeaders()
        })
    );