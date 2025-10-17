import { MouseEventHandler, ReactElement } from "react";

export default function Pagination({
  previousPage,
  currentPage,
  nextPage,
  lastPage,
  handleClick,
}: {
  previousPage: number;
  currentPage: number;
  nextPage: number;
  lastPage: number;
  handleClick: MouseEventHandler<HTMLAnchorElement>;
}): ReactElement {
  return (
    <nav className="flex list-none gap-3 justify-center">
      <a
        href="#"
        className="no-underline px-3 py-1 cursor-pointer border rounded-md hover:bg-accent"
        onClick={handleClick}
      >
        1
      </a>
      <a
        href="#"
        className="no-underline px-3 py-1 cursor-pointer border rounded-md hover:bg-accent"
        onClick={handleClick}
      >
        {previousPage}
      </a>
      <a
        href="#"
        className="no-underline px-3 py-1 cursor-pointe border rounded-md hover:bg-accent"
        onClick={handleClick}
      >
        {currentPage}
      </a>
      <a
        href="#"
        className="no-underline px-3 py-1 cursor-pointer border rounded-md hover:bg-accent"
        onClick={handleClick}
      >
        {nextPage}
      </a>
      <a href="#" className="py-1" aria-disabled>
        ...
      </a>
      <a
        href="#"
        className="no-underline px-3 py-1 cursor-pointer border rounded-md hover:bg-accent"
        onClick={handleClick}
      >
        {lastPage}
      </a>
    </nav>
  );
}
