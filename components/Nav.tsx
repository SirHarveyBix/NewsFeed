import Link from 'next/link';

export const Nav = () => {
  return (
    <ul className="flex grid grid-cols-4">
      <div className="col-span-1 flex justify-start">
        <li className="mr-6">
          <Link href="/">
            <div className="inline-flex cursor-pointer">
              <img className="sm:h-10 h-8 pr-1" src="/logo.png" />
              <a className="p-2 text-center block hover:blue-700 sm:visible invisible">News</a>
            </div>
          </Link>
        </li>
      </div>
    </ul>
  );
};
