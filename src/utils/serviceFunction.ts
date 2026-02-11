import type { JobFromDB } from "../types/job.types.js";
import type { JobSheetFromDB } from "../types/jobSheet.types.js";

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