import { useGSAP } from '@gsap/react';
import { Task } from '../App';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

type Props = {
  task: Task;
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
};
export function TaskItem({ task, setTaskList }: Props) {
  const [bgColor, setBgColor] = useState('bg-white');
  const [pencilUrl, setPencilUrl] = useState('/img/pencil.svg');
  const [isTaskEdit, setIsTaskEdit] = useState(false);
  gsap.registerPlugin(useGSAP, Draggable);
  const id = 'gsap' + task.id;
  const idSelector = '#' + id;
  console.log(id);
  const container = useRef(null);
  let startPosX = 0;
  function saveTask(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskList((tList) =>
      tList.map((item) =>
        item.id === task.id ? { ...item, text: e.target.value } : item
      )
    );
  }

  useGSAP(
    () => {
      Draggable.create('#' + id, {
        type: 'x',
        // dragResistance: 0.2,
        // bounds: document.getElementById('container'),
        // inertia: true,
        onClick: function () {
          startPosX = this.x;
        },
        onPress: function () {
          // Haptics.impact({ style: ImpactStyle.Heavy });
        },
        onDrag: function () {
          if (startPosX - this.x > 0) {
            setBgColor('bg-red-600');
          } else {
            setBgColor('bg-blue-600');
          }
          if (
            (startPosX - this.x > 100 && startPosX - this.x < 102) ||
            (startPosX - this.x < -100 && startPosX - this.x > -102)
          ) {
            Haptics.impact({ style: ImpactStyle.Heavy });
          }
        },
        onDragEnd: function () {
          if (startPosX - this.x > 100) {
            setPencilUrl('');
            console.log('del');
            gsap.to(idSelector, {
              x: startPosX - 400,
              duration: 0.3,
              ease: 'power.in',
              onComplete: function () {
                gsap.to('#li' + id, {
                  height: 0,
                  // padding: 0,
                  duration: 0.2,
                  // ease: 'circ.out',
                });
                // gsap.to('#' + id, { height: 0, duration: 0.3 });
                gsap.to('#li' + id, {
                  visibility: 'none',
                  duration: 0.5,
                  onComplete: function () {
                    setTaskList((taskList) => {
                      const newTaskList = taskList.filter((item) => item.id !== task.id);
                      localStorage.setItem('taskList', JSON.stringify(newTaskList));
                      return newTaskList;
                    });
                  },
                });
              },
            });
          } else if (startPosX - this.x < -100) {
            setIsTaskEdit(true);
            gsap.to(idSelector, { x: startPosX, duration: 0.1 });
          } else {
            gsap.to(idSelector, { x: startPosX, duration: 0.1 }).then(() => {
              setBgColor('bg-white');
            });
          }
        },
      });
    },
    { scope: container }
  );
  return (
    <li
      id={'li' + id}
      ref={container}
      // className={`overflow-hidden ${bgColor} bg-[url('/img/pencil.svg'),_url('/img/trash-2.svg')] bg-no-repeat bg-[position:left_10px_center,_right_10px_center]`}
      className={`overflow-hidden ${bgColor} bg-[url('${pencilUrl}'),_url('/img/trash-2.svg')] bg-no-repeat bg-[position:left_10px_center,_right_10px_center]`}
    >
      <div id={id} className={`p-4 bg-white`}>
        {isTaskEdit ? (
          <form
            action=''
            onSubmit={() => {
              setIsTaskEdit(false);
            }}
          >
            <input
              type='text'
              className='border-none outline-none'
              value={task.text}
              autoFocus
              onChange={saveTask}
              onBlur={() => {
                setIsTaskEdit(false);
              }}
            />
          </form>
        ) : (
          task.text
        )}
      </div>
    </li>
  );
}
