/* eslint-disable prettier/prettier */
import axios from 'axios';
import * as moment from 'moment';

type LogOptions = {
  status: 'success' | 'error' | 'warning';
  payload: any,
  functionName?: string,
  response?:string
};

export class SlackHelper {
  static slackApiUrl = 'https://slack.com/api';

  static log(options: LogOptions) {
    let status = '🟢 Success';
    if (options.status === 'error') status = '🔴 Error';
    if (options.status === 'warning') status = '🟡 Warning';
    axios.post(
      `${SlackHelper.slackApiUrl}/chat.postMessage`,
      {
        channel: 'api_myspa_microservice',
        username: 'System Bot',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '*🚨 Microservice Alert*',
            },
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*Payload:*\nAPI ${JSON.stringify(options.payload)}`,
              },
              {
                type: 'mrkdwn',
                text: '*Function:*\n' + options.functionName,
              },
            ],
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: '*Service:*\nAPI Microservice',
              },
              {
                type: 'mrkdwn',
                text: '*Status:*\n' + status,
              },
            ],
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: options.response,
              },
            ],
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: `created at: ${moment().format('YYYY-MM-DD HH:mm:ss')}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.SLACK_APP_XOXP_TOKEN}`,
        },
      },
    ).then().catch(error => console.log(error));
  }
}
