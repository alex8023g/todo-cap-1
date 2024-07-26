import { PlusIcon } from '@heroicons/react/20/solid';

type Props = {
  setIsAddTask: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Example({ setIsAddTask }: Props) {
  return (
    <button
      id='btn1'
      type='button'
      className='fixed bottom-5 right-5 drop-shadow-xl rounded-2xl bg-cyan-600 p-5 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      onClick={() => {
        setIsAddTask(true);
      }}
    >
      <PlusIcon className='h-7 w-7' aria-hidden='true' />
    </button>
  );
}
