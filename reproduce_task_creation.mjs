import { $fetch } from 'ofetch';

async function testTaskCreation() {
  const boardId = 'vteYPDXLCCcU'; // Based on the task boardId
  
  // Need to be logged in? Assuming we can't easily login here, 
  // maybe I can try just fetching the endpoint directly
  // But this might fail due to lack of session.
  
  // Let's try creating a task with description
  try {
    const task = await $fetch(`http://localhost:3000/api/boards/${boardId}/tasks`, {
      method: 'POST',
      body: {
        title: 'Test Task Creation',
        description: 'This is a test description',
        status: 'todo'
      }
    });
    console.log('Task created:', task);
    
    // Fetch task again to check description
    // The endpoint to fetch tasks is probably GET /api/boards/[id]/tasks
    const tasks = await $fetch(`http://localhost:3000/api/boards/${boardId}/tasks`);
    const createdTask = tasks.find((t) => t.id === task.id);
    console.log('Created task description:', createdTask.description);
    
    if (createdTask.description === 'This is a test description') {
      console.log('SUCCESS: Description saved.');
    } else {
      console.error('FAILURE: Description not saved.');
    }
  } catch (e) {
    console.error('Error:', e);
  }
}

testTaskCreation();
