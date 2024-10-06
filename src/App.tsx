import { useState } from 'react';
import './App.css';
import Fab from './components/Fab';
import { nanoid } from 'nanoid';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
import { TaskItem } from './components/TaskItem';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Footer } from './components/Footer';

export type Task = {
  id: string;
  text: string;
  isDone: boolean;
};
function App() {
  const [taskList, setTaskList] = useState<Task[]>(
    JSON.parse(localStorage.getItem('taskList') || '[]'),
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
        isDone: false,
      });
      localStorage.setItem('taskList', JSON.stringify(newTaskList));
      return newTaskList;
    });

    setTextInput('');
  }

  return (
    <main className='flex h-full flex-col'>
      <h1 className='bg-cyan-600 py-3 text-center text-3xl font-bold text-white drop-shadow-lg'>
        Reminders
      </h1>
      {/* <div className='border border-blue-600 grow'>1</div> */}
      {/* <div className='ScrollAreaRoot border border-blue-600 grow '> */}
      <ScrollArea.Root className='ScrollAreaRoot h-52 grow overflow-hidden'>
        <ScrollArea.Viewport className='ScrollAreaViewport h-full'>
          <ul
            role='list'
            className='border-grey-600 divide-y divide-gray-200 border'
          >
            {taskList
              .filter((task) => !task.isDone)
              .map((task) => (
                <TaskItem task={task} setTaskList={setTaskList} key={task.id} />
              ))}
            {isAddTask && (
              <li key={nanoid()} className='px-4 py-4 sm:px-6'>
                <form action='submit' onSubmit={saveTask}>
                  <input
                    // defaultChecked={task.id === 'small'}
                    // id={task.id}
                    name='plan'
                    type='radio'
                    // aria-describedby={`${task.id}-description`}
                    className='my-auto mr-2 h-4 w-4 shrink-0 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
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
            {taskList
              .filter((task) => task.isDone)
              .map((task) => (
                <TaskItem task={task} setTaskList={setTaskList} key={task.id} />
              ))}
          </ul>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className='' orientation='vertical'>
          <ScrollArea.Thumb className='' />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
      {/* </div> */}
      <Fab setIsAddTask={setIsAddTask} />

      <Footer />
    </main>
  );
}

export default App;
