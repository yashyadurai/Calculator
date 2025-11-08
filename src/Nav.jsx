import { Disclosure } from '@headlessui/react'


export default function Nav() {
  return (
    <Disclosure
      as="nav"
      className="bg-emerald-800 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 justify-center items-center pt-4"
    >
      <div className=' w-auto h-auto flex justify-center items-center font-bold font-sans text-4xl text-center pb-4'>
          <h1 className=' text-white text-center'>Calculator</h1>
      </div>
      <nav className='navbar list-none bg-green-700 p-4 flex text-center overflow-hidden justify-end items-center'>
        <ul>
          <li className='float-left ml-4 hover:bg-amber-600 p-3 transition hover:scale-110 duration-200 delay-75 ease-in-out hover:translate-3 font-bold font-mono'><a href="https://yashyadurai.github.io/My-Links" target='_blank'>Links</a></li>
          <li className='float-left ml-4 transition delay-75 ease-in-out duration-200 hover:scale-110 hover:bg-fuchsia-500 p-3 hover:translate-3 font-mono font-bold'><a href="https://github.com/yashyadurai" target='_blank'>Github</a></li>
          <li className='float-left ml-4 hover:bg-blue-600 delay-75 transition  ease-in-out duration-200 hover:scale-110 p-3 hover:translate-3 font-mono font-bold'><a href="https://yashyadurai.github.io/Avengers/" target='_blank'>Captain America</a></li>
          <li className='float-left ml-4 hover:bg-rose-700 delay-75 transition  ease-in-out duration-200 hover:scale-110 p-3 hover:translate-3 font-mono font-bold'><a href="#calculator">Calculator</a></li>
        </ul>
      </nav>
    </Disclosure>
  )
}
