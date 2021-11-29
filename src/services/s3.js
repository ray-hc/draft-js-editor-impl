/** *** S3 *** */
/*
 * Given a file, sends information to our server to generate S3 Signed request, then
 * uploads that file to S3 and returns a promise to handle file upload.
 */

import axios from 'axios';

const ROOT_URL = 'https://our-stories-api.herokuapp.com/api';

/** ** getSignedRequest ** */
/*
 * hit our own server to get a signed s3 url
 */
function getSignedRequest(file) {
  const fileName = encodeURIComponent(file.name);
  return axios.get(`${ROOT_URL}/sign-s3?file-name=${fileName}&file-type=${file.type}`);
}

/** ** uploadFileToS3 ** */
/*
 * Return a promise that uploads file directly to S3
 * note how we return the passed in url here rather than any return value
 * since we already know what the url will be - just not that it has been uploaded
 */
function uploadFileToS3(signedRequest, file, url) {
  return new Promise((fulfill, reject) => {
    axios.put(signedRequest, file, { headers: { 'Content-Type': file.type } }).then((response) => {
      fulfill(url);
    }).catch((error) => {
      reject(error);
    });
  });
}

/** ** uploadFile ** */
/*
 * External function which wraps up S3 functions into single, abstracted function.
 */
export default function uploadFile(file) {
  return getSignedRequest(file).then((response) => {
    return uploadFileToS3(response.data.signedRequest, file, response.data.url);
  });
}
