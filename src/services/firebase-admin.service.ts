// src/firebase/firebase-admin.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAdminService {
  private readonly logger = new Logger(FirebaseAdminService.name);
  private appCache = new Map<string, admin.app.App>();

  async getFirebaseApp(
    appId: string,
    serviceAccount: any,
  ): Promise<admin.app.App> {
    if (this.appCache.has(appId)) {
      this.logger.log(`Firebase App [${appId}] ealready.`);
      return this.appCache.get(appId)!;
    }

    const firebaseApp = admin.initializeApp(
      {
        credential: admin.credential.cert(serviceAccount),
      },
      appId,
    );

    this.appCache.set(appId, firebaseApp);
    this.logger.log(`Firebase App [${appId}] initialized.`);
    return firebaseApp;
  }

  async sendNotification(
    appId: string,
    serviceAccount: any,
    token: string,
    title: string,
    body: string,
  ) {
    const app = await this.getFirebaseApp(appId, serviceAccount);
    return app.messaging().send({
      token,
      notification: {
        title,
        body,
      },
    });
  }

  async sendNotificationTopic(options: {
    appId: string;
    serviceAccount: any;
    topic: string;
  }) {
    const { appId, serviceAccount, topic } = options;
    const app = await this.getFirebaseApp(appId, serviceAccount);
    return app.messaging().send({
      notification: {
        title: 'Thông báo nè',
        body: 'Long Chim này',
      },
      data: { type: '1' },
      topic,
    });
    return;
  }

  async verifyToken(appId: string, serviceAccount: any, idToken: string) {
    const app = await this.getFirebaseApp(appId, serviceAccount);
    return app.auth().verifyIdToken(idToken);
  }
}
