const qs = require('querystring');
var Jimp = require("jimp");

const AWS = require('aws-sdk');

AWS.config.update({region: 'ap-northeast-2'});

const s3 = new AWS.S3();

exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const { width, height } = qs.parse(request.querystring);
    const parsedWidth = parseInt(width);
    const parsedHeight = parseInt(height);

    if (Number.isNaN(parsedWidth) && Number.isNaN(parsedHeight)) {
        callback(null, request);
        return;
    }

    s3.getObject({
        Bucket: "<버킷 이름>",
        Key: request.uri.replace('/', '')
    }, (_, object) => {
        const contentType = object.ContentType;
        Jimp.read(object.Body)
            .then((jimp) => {
                if (!Number.isNaN(parsedWidth) && !Number.isNaN(parsedHeight)) {
                    jimp.resize(parsedWidth, parsedHeight);
                } else if (!Number.isNaN(parsedWidth)) {
                    jimp.resize(parsedWidth, Jimp.AUTO);
                } else if (!Number.isNaN(parsedHeight)) {
                    jimp.resize(Jimp.AUTO, parsedHeight);
                }
                jimp.getBase64(contentType, (_, result) => {
                    const response = {
                        status: '200',
                        statusDescription: 'OK',
                        headers: {
                            'cache-control': [{
                                key: 'Cache-Control',
                                value: 'max-age=100'
                            }],
                            'content-type': [{
                                key: 'Content-Type',
                                value: contentType
                            }]
                        },
                        body: result.replace(`data:${contentType};base64,`, ''),
                        bodyEncoding: 'base64'
                    };

                    callback(null, response);
                });
            })
    });
};
