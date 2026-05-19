import { eq, inArray } from 'drizzle-orm'
import { db } from '../../../../../db'
import { tasks } from '../../../../../db/schema'

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const body = await readBody(event)
  const { taskIds, status } = body

  if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0 || !status) {
    throw createError({ statusCode: 400, message: 'Invalid request' })
  }

  // Check board existence and membership - need boardId for safety, but tasks have boardId
  // For now just update tasks if they exist
  await db.update(tasks)
    .set({ status })
    .where(inArray(tasks.id, taskIds))

  return { success: true }
})
