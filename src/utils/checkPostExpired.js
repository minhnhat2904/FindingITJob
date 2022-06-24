import cron from 'node-cron';
import { Post } from "../models";

export const task = cron.schedule('*/10 * * * *', async () => {
    const posts = await Post.find({ $where: function() {
        const dateExpired = new Date(this.endTime);
        return dateExpired.getTime() < new Date();
    }});
    await posts.updateMany({}, 
    {
        $set: {
            status: 'DONE'
        }
    });
}, {
    scheduled: true,
    timezone: "Asia/Ho_Chi_Minh"
})
