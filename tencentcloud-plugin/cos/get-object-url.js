/*
 * Copyright (C) 2020 Tencent Cloud.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const COS = require('cos-nodejs-sdk-v5');
const { secretId, secretKey } = require('../config');
const { bucket, region, expires } = require('./config');

/**
 * 获取腾讯云COS文件的临时访问地址
 * @param {object} params - 参数包装对象
 * @param {string} params.key - 将要访问COS文件的名称
 * @return {string} COS文件的访问地址（包含临时签名）
 */
function getObjectURL({ key }) {
  // 配置校验
  if (!secretId || !secretKey || !bucket || !region || isNaN(expires) || expires <= 0) {
    throw new Error('请检查云函数配置文件!');
  }
  return new COS({
    SecretId: secretId,
    SecretKey: secretKey,
  }).getObjectUrl({
    Bucket: bucket,
    Region: region,
    Method: 'GET',
    Key: key,
    Expires: expires,
    Sign: true,
  });
}

module.exports = getObjectURL;
