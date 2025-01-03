import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import Cookies from 'js-cookie';

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

const Dropdown = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    setLoading(true); 
    localStorage.removeItem('authToken');
    Cookies.remove('authToken', { path: '/' });
    setTimeout(() => {
      setLoading(false);
      toast.success('Logged out successfully'); 
      router.push('/UserLogin');
    }, 1000);
  };


  useEffect(() => {
    if(loading){ 
         toast.loading("loading...", { id: 1 });
    }
  }, [loading])

  useEffect(() => {
   toast.dismiss(1)
  }, [])
  


  return (
    <div>
      <Toaster/>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="User Avatar"
              className="border border-gray-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <h1 className='text-white'>User</h1>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-4 w-4 transition-transform ${
                isMenuOpen ? "rotate-180 text-white" : "text-white"
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={isLastItem ? handleLogout : closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
 
    </div>
  );
};

export default Dropdown;
