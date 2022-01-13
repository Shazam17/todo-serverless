
export const createTask = (taskId: string, title: string, desc: string, ) => {
    if (!taskId || !title || !desc) {
        const error = new Error('');
        throw error;
    }

}
