import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend: Resend;
  private readonly fromEmail: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY || 're_ZPYBNMWd_KoMJ6K3YXqZsijqRxW3XMq6c';
    this.resend = new Resend(apiKey);
    this.fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  }

  private async sendEmail(to: string, subject: string, html: string, text?: string): Promise<void> {
    try {
      const result = await this.resend.emails.send({
        from: this.fromEmail,
        to,
        subject,
        html,
        ...(text ? { text } : {}),
      });

      this.logger.log(`Email sent to ${to}. id=${result.data?.id || 'n/a'}`);
    } catch (error: any) {
      this.logger.error(`Failed to send email to ${to}: ${error?.message || error}`);
      throw error;
    }
  }

  async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}`;

    await this.sendEmail(
      email,
      'Verify your INAMSOS email',
      `<p>Please verify your email by clicking the link below:</p><p><a href="${verificationUrl}">${verificationUrl}</a></p>`,
      `Please verify your email: ${verificationUrl}`,
    );
  }

  async sendWelcomeEmail(email: string, name: string, role: string) {
    await this.sendEmail(
      email,
      'Welcome to INAMSOS',
      `<p>Hello ${name},</p><p>Welcome to INAMSOS. Your role is <strong>${role}</strong>.</p>`,
      `Hello ${name}, welcome to INAMSOS. Your role is ${role}.`,
    );
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

    await this.sendEmail(
      email,
      'Reset your INAMSOS password',
      `<p>You requested a password reset. Click the link below:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
      `Reset your password: ${resetUrl}`,
    );
  }

  async sendNotificationEmail(email: string, title: string, message: string) {
    await this.sendEmail(
      email,
      title,
      `<p>${message}</p>`,
      message,
    );
  }

  async sendReportEmail(email: string, reportName: string, filePath: string) {
    await this.sendEmail(
      email,
      `Your report is ready: ${reportName}`,
      `<p>Your report <strong>${reportName}</strong> is ready.</p><p>File path: ${filePath}</p>`,
      `Your report ${reportName} is ready. File path: ${filePath}`,
    );
  }
}
