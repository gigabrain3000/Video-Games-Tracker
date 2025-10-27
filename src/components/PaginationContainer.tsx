import { MouseEventHandler, ReactElement } from "react";
import { Pagination, PaginationEllipsis, PaginationItem, PaginationLink } from "./ui/pagination";

export default function PaginationContainer({
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
    <Pagination className="gap-1">
      <PaginationItem className="list-none">
        <PaginationLink href="" onClick={handleClick} isActive>
          1
        </PaginationLink>
      </PaginationItem>
      <PaginationItem className="list-none">
        <PaginationLink href="" onClick={handleClick}>
          {previousPage}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem className="list-none">
        <PaginationLink href="" onClick={handleClick}>
          {currentPage}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem className="list-none">
        <PaginationLink href="" onClick={handleClick}>
          {nextPage}
        </PaginationLink>
      </PaginationItem>
        <PaginationItem className="list-none">
          <PaginationEllipsis />
        </PaginationItem>
      <PaginationItem className="list-none">
        <PaginationLink href="" onClick={handleClick}>
          {lastPage}
        </PaginationLink>
      </PaginationItem>
    </Pagination>
    );
}
