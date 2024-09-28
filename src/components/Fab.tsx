import { PlusIcon } from '@heroicons/react/20/solid';

type Props = {
  setIsAddTask: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Example({ setIsAddTask }: Props) {
  return (
    <button
      id='btn1'
      type='button'
      className='absolute bottom-3 left-1/2 -translate-x-1/2 drop-shadow-xl rounded-full bg-cyan-600 p-5 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      onClick={() => {
        setIsAddTask(true);
      }}
    >
      <PlusIcon className='h-6 w-6' aria-hidden='true' />
    </button>
  );
}
