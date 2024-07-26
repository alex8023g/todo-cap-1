import { useState } from 'react';
import './App.css';
import Fab from './components/Fab';
import { nanoid } from 'nanoid';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
import { TaskItem } from './components/TaskItem';

export type Task = {
  id: string;
  text: string;
};
function App() {
  const [taskList, setTaskList] = useState<Task[]>(
    JSON.parse(localStorage.getItem('taskList') || '[]')
  );
  const [isAddTask, setIsAddTask] = useState(false);
  const [textInput, setTextInput] = useState('');

  function saveTask() {
    setIsAddTask(false);
    if (!textInput) return;
    setTaskList((taskList) => {
      const newTaskList = taskList.concat({
        id: nanoid(),
        text: textInput,
      });
      localStorage.setItem('taskList', JSON.stringify(newTaskList));
      return newTaskList;
    });

    setTextInput('');
  }

  return (
    <main>
      <h1 className='z-50 sticky top-0 text-3xl font-bold text-center py-3  bg-cyan-600 text-white drop-shadow-lg'>
        Reminders
      </h1>
      <ul role='list' className='divide-y divide-gray-200 border border-grey-600'>
        {taskList.map((task) => (
          <TaskItem task={task} setTaskList={setTaskList} key={task.id} />
        ))}
        {isAddTask && (
          <li key={nanoid()} className='px-4 py-4 sm:px-6'>
            <form action='submit' onSubmit={saveTask}>
              <input
                type='text'
                autoFocus
                className='border-none outline-none'
                onChange={(e) => {
                  setTextInput(e.target.value);
                }}
                value={textInput}
                onBlur={saveTask}
              />
            </form>
          </li>
        )}
      </ul>
      <Fab setIsAddTask={setIsAddTask} />
    </main>
  );
}

export default App;
