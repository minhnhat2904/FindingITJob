import cron from 'node-cron';
import { Post } from "../models";

export const task = cron.schedule('0 */1 * * * *', async () => {
    const posts = await Post.find({ $where: function() {
        const dateExpired = new Date(this.endTime);
        console.log(dateExpired);
        return dateExpired.getTime() < new Date();
    }});
    console.log(posts);
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
