/**
 * Created by watcher on 7/3/18.
 */
const googleTrends = require('google-trends-api');

function getDataByType(type, resource, params = {}) {
    let result = {};

    switch (type) {
        case 'region':
            resource.default.geoMapData.map(item => {
                if (item.value.length && item.value[0] > 0) {
                    result[item.geoName] = item.value[0];
                }
            });
            break;
        case 'time':
            resource.default.timelineData.map(item => {
                if (item.value.length && item.value[0] > 0) {
                    result[item.formattedTime] = item.value[0];
                }
            });
            break;
    }

    return result;
}

module.exports = async(params) => {
    const dataType = params.resolution ? 'region' : 'time';
    let requestData = [];

    // TODO: sort, validation for params

    if (params.startTime) params.startTime = new Date(params.startTime);
    if (params.endTime) params.endTime = new Date(params.endTime);

    requestData = dataType === 'time' ?
        await googleTrends.interestOverTime({ ...params }) :
        await googleTrends.interestByRegion({ ...params });

    const result = getDataByType(dataType, JSON.parse(requestData));

    return result;
}
