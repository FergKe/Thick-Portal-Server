import { AppError } from "../errors/AppError.js";
import type { AggJobFromDB, JobFromDB } from "../types/job.types.js";
import type { JobSheetFromDB } from "../types/jobSheet.types.js";
import nodemailer from 'nodemailer';

export const jobSheetConversion = (jobsheet: JobSheetFromDB) => {
    return {
        ...jobsheet,
        _id: jobsheet._id.toString(),
        jobId: jobsheet.jobId.toString(),
        planterId: jobsheet.planterId.toString(),
        plants: jobsheet.plants.map(plant => ({ ...plant, plantId: plant.plantId.toString() })),
        nonPlantingTask: jobsheet.nonPlantingTask.map(task => ({ ...task, taskId: task.taskId.toString() })),
    }
};

export const jobConversion = (job: JobFromDB) => {
    return {
        ...job,
        _id: job._id.toString(),
        crew: job.crew.map(crew => crew.toString()),
        teamLead: job.teamLead.toString(),
        jobSheets: job.jobSheets.map(jobSheet => jobSheet.toString()),
        
    }
}

export const aggJobConversion = (job: AggJobFromDB) => {
  return {
    ...job,
    _id: job._id.toString(),
    teamLead: job.teamLead.toString(),
    crew: job.crew.map(crew => ({ ...crew, _id: crew._id.toString() })),
    jobSheets: job.jobSheets.map(jobSheet => jobSheet.toString()),
  }
}

export async function sendPlanterInvite(email: string, id: string) {
  try {

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, 
      auth: {
        user: testAccount.user, // Replace with process.env.EMAIL_USER for production
        pass: testAccount.pass, // Replace with process.env.EMAIL_PASS for production
      },
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const registerLink = `${frontendUrl}/signUp/registerPlanter/${id}`;

    const mailOptions = {
      from: '"Thicket Operations" <noreply@thicket.com>',
      to: email,
      subject: "Invitation: Register as a Thicket Planter",
      text: `Welcome! Please register at: ${registerLink}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #2e7d32;">Welcome to Thicket!</h2>
          <p>You have been invited by a manager to join the Thicket platform as a planter.</p>
          <p>To get started and set up your account, please click the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${registerLink}" 
               style="background-color: #2e7d32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
              Complete Registration
            </a>
          </div>
          <p style="font-size: 12px; color: #666;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${registerLink}">${registerLink}</a>
          </p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">
          <p style="font-size: 12px; color: #999; text-align: center;">
            &copy; ${new Date().getFullYear()} Thicket Management System
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("-----------------------------------------");
    console.log("INVITE SENT TO:", email);
    console.log("Message ID:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    console.log("-----------------------------------------");

    return
  } catch (error) {
    
    throw new AppError(500, "Failed to send invitation email.");
  }
}