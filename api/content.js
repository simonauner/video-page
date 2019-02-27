import request from 'request-promise-native';

export const getContent = function(contentId) {
    return request(`https://content.viaplay.se/pc-se/film/${contentId}`);
};
