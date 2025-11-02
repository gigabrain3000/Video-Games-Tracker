import { House, LibraryBig, Settings, User } from "lucide-react";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

export function Sidebar(): ReactElement {
  const { currentUser } = useAppContext();
  return (
    <>
      <aside className="mr-5 mt-15">
        <ul className="flex flex-col h-full gap-5 max-w-50 min-w-25">
          <li>
            <Link className="flex gap-1 cursor-pointer font-semibold" to={"/"}>
              <House className="pb-1" />
              Home
            </Link>
          </li>
          {currentUser ? (
            <>
              <li>
                <Link
                  className="flex gap-1 cursor-pointer font-semibold"
                  to={currentUser ? "/library" : "/login"}
                >
                  <LibraryBig className="pb-1" />
                  Library
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-1 cursor-pointer font-semibold"
                  to={currentUser ? "/settings" : "/login"}
                >
                  <Settings className="pb-1" />
                  Settings
                </Link>
              </li>
            </>
          ) : null}

          <li>
            <Link
              className="flex gap-1 grow-2 cursor-pointer font-semibold align-bottom"
              to={currentUser ? `/u/${currentUser.username}` : "/login"}
            >
              <User className="pb-1" />
              {currentUser ? currentUser.username : "Log In"}
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}
