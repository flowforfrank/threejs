const path = 'mock';
const response = {
    mock: true
};

function set (obj, path, value) {
    const pList = path.split('.');
    const len = pList.length;

    for (let i = 0; i < len - 1; i++) {
        const elem = pList[i];

        if (!obj[elem]) {
            obj[elem] = {};
        }

        obj = obj[elem];
    }

    obj[pList[len-1]] = value;
}

module.exports = {
    *beforeSendResponse(requestDetail, responseDetail) {
        const mockedResponse = responseDetail.response;
        const json = JSON.parse(mockedResponse.body);

        set(json, path, response);

        mockedResponse.body = Buffer.from(JSON.stringify(json));

        return {
            response: mockedResponse 
        };
    },
};