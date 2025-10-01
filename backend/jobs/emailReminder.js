import cron from "node-cron";
import emailReminderWorker from "../controlers/emailRemainder.js";

// Run worker once after 20 seconds (for testing)
setTimeout(async () => {
  console.log("[Test] Running Email Reminder Worker after 20 seconds...");
  await emailReminderWorker();
  console.log("[Test] Email Reminder Worker finished.\n");
}, 6000); // 20000ms = 20s

// Schedule task every 1 hour
cron.schedule("0 * * * *", async () => {
  console.log("[CronJob] Running Email Reminder Worker...");
  await emailReminderWorker();
  console.log("[CronJob] Email Reminder Worker finished.\n");
});