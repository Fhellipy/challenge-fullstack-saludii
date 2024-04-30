/*
  Warnings:

  - You are about to drop the column `prevPosition` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "prevPosition",
ADD COLUMN     "taskIdPrev" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskIdPrev_fkey" FOREIGN KEY ("taskIdPrev") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
